import { ethers } from "ethers";
import { useState } from "react";
import { Task } from "src/models/task";
import { UserRole } from "src/models/user";
import { tasksManagerContract } from "../wagmi";
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";
import { useSnackBar } from "src/contexts/SnackBarContext";
import { AlertColor } from "@mui/material/Alert";

export function useTaskService() {
	const { userAddress, parseUnits } = useWeb3Utils();
	const { showSnackBar } = useSnackBar();

	const handleSnackbar = (message: string, color: AlertColor) => {
		showSnackBar(message, color);
	};

	// Leader
	async function createTask(task: Task) {
		let functionName = "createTask";
		try {
			await tasksManagerContract.createTask(task);
		} catch (error) {
			_unauthorizeUserError(functionName);
		}
	}

	async function startTask(id: bigint, authorizedRoles: [Number], assignee: string) {
		let functionName = "startTask";
		try {
			const hasRole = await tasksManagerContract.hasRole(
				authorizedRoles,
				userAddress()
			);

			const isAssignee = (assignee == userAddress())

			if (!hasRole || !isAssignee) {
				_unauthorizeUserError(functionName);
			} else {
				await tasksManagerContract.startTask(id, authorizedRoles);
			}
		} catch (error) {
			_unauthorizeUserError(functionName);
		}
	}

	/**
	 * @dev This function reviews a task and let the caller push a metadata.
	 *
	 * The metadata is a string that can be used to store any information. We
	 * use it to store the IPFS hash of the review.
	 *
	 * IMPORTANT: This function can be called more than once by both task creator
	 * or asssignee. This is because we want to allow a ping-pong of reviews until
	 * the due date or completion. This will create a history of reviews that can
	 * be used to track the progress of the task and raise a dispute if needed.
	 */
	async function reviewTask(id: bigint, metadata: string, authorizedRoles: [Number], assignee: string) {
		let functionName = "reviewTask";

		try {
			const isOperator = await tasksManagerContract.isOperator(
				await _getSighash(functionName),
				authorizedRoles
			);

			if (!isOperator) {
				_unauthorizeUserError(functionName);
			} else {
				await tasksManagerContract.reviewTask(id, authorizedRoles, metadata);
			}
		} catch (error) {
			_unauthorizeUserError(functionName);
		}
	}

	/**
	 * @dev Only Leaders can operate this function, but the
	 * task creator role are the one able to complete the task.
	 */
	async function completeTask(id: bigint, authorizedRoles: [Number]) {
		let functionName = "completeTask";
		// Check if the user is a valid operator of the function and has the leader role
		// const hasRole = await hasLeaderRole(userAddress());


		/**
		 * @dev The following check will make sure that the requirements are meet:
		 *
		 * - `id` must have a valid matching task id.
		 * - `task.endDate` must be greater than `block.timestamp`.
		 * - `task.creator` must match `roleId`.
		 * - `userAddress` cannot vote twice.
		 */
		const task = await _validateTask(id);

		const isOperator = await tasksManagerContract.isOperator(
			await _getSighash(functionName),
			authorizedRoles
		);

		const hasRole = await tasksManagerContract.hasRole(
			authorizedRoles,
			userAddress()
		);

		const voted = await hasVoted(id, userAddress());
		if (
			!isOperator ||
			!hasRole ||
			voted
		) {
			await _unauthorizeUserError(functionName);
		} else {
			// Complete the task
			await tasksManagerContract.completeTask(id, authorizedRoles);
		}
	}
	/**
	 * @dev Only Leaders can operate this function, but the
	 * task creator role are the one able to cancel the task.
	 */
	async function cancelTask(id: bigint, authorizedRole: Number) {
		let functionName = "cancelTask";

		/**
		 * @dev The following check will make sure that the requirements are meet:
		 *
		 * - `id` must have a valid matching task id.
		 * - `task.endDate` must be greater than `block.timestamp`.
		 * - `task.creator` must match `roleId`.
		 */

		const isOperator = await tasksManagerContract.isOperator(
			await _getSighash(functionName),
			authorizedRole
		);

		const hasRole = await tasksManagerContract.hasRole(
			authorizedRole,
			userAddress()
		);

		if (
			!isOperator ||
			!hasRole
		) {
			await _unauthorizeUserError(functionName);
		}
		await tasksManagerContract.cancelTask(id, authorizedRole);
	}

	async function getTask(taskId: any) {
		try {
			return await tasksManagerContract.getTask(taskId);
		} catch (error) {
			handleSnackbar("Error searching Task. It does not exist!", "error");
		}
	}
	async function countTasks() {
		try {
			return await tasksManagerContract.getTaskId();
		} catch (error) {
			handleSnackbar(
				"Connect wallet to see the amount of tasks available.",
				"error"
			);
		}
	}

	async function countUserTasks() {
		try {
			let taskIds: bigint[] = [];
			taskIds = await tasksManagerContract.getUserTasks(userAddress());
			return taskIds.length + 1;
		} catch (error) {
			handleSnackbar(
				"Error when looking for the amount of tasks of the user.",
				"error"
			);
		}
	}

	async function getMultiTasks(
		min: number,
		max: number,
		isUserProfile: boolean
	) {
		/// Prepare the encoding of data and submit it to the contract
		const payloadArray = [];
		let taskIds: bigint[] = [];

		if (isUserProfile) {
			taskIds = await tasksManagerContract.getUserTasks(userAddress());
			if (taskIds && taskIds.length > 0) {
				for (var i = 0; i < taskIds.length; i++) {
					let id = Number(taskIds[i]);
					payloadArray.push(
						tasksManagerContract.interface.encodeFunctionData("getTask", [id])
					);
				}
			}
		} else {
			for (var i = min; i <= max; i++) {
				payloadArray.push(
					tasksManagerContract.interface.encodeFunctionData("getTask", [i])
				);
			}
		}

		const response = await tasksManagerContract.multicallRead(payloadArray);

		/// Decode the results
		let decodedResults = [];
		/// Get the sighash of the function
		let getTaskID =
			tasksManagerContract.interface.getSighash("getTask(uint256)");
		/// Map the results to the function name and the decoded arguments
		decodedResults = response.map((res: any) => {
			try {
				const decodedArgs = tasksManagerContract.interface.decodeFunctionResult(
					getTaskID,
					res
				);
				return {
					name: tasksManagerContract.interface.getFunction(getTaskID).name,
					args: decodedArgs,
				};
			} catch (error) {
				console.log("Could not decode result", error);
			}
		});
		return decodedResults;
	}

	async function setRole(
		roleId: any,
		authorizedAddress: any,
		isAuthorized: boolean
	) {
		try {
			return await tasksManagerContract.setRole(
				roleId,
				authorizedAddress,
				isAuthorized
			);
		} catch (error) {
			handleSnackbar("Error setting Role", "error");
		}
	}

	async function setOperator(
		interfaceId: any,
		roleId: any,
		isAuthorized: boolean
	) {
		try {
			return await tasksManagerContract.setOperator(
				interfaceId,
				roleId,
				isAuthorized
			);
		} catch (error) {
			handleSnackbar("Error setting Operator", "error");
		}
	}

	async function setRoleName(roleId: any, roleName: any) {
		console.log(roleId);
		console.log(roleName);
		try {
			return await tasksManagerContract.setRoleName(roleId, roleName);
		} catch (error) {
			handleSnackbar("Error setting RoleName1", "error");
		}
	}

	async function setMinQuorum(quorum: any) {
		try {
			return await tasksManagerContract.setMinQuorum(quorum);
		} catch (error) {
			handleSnackbar("Error setting Quorum", "error");
		}
	}

	async function deposit(roleId: any, amount: any) {
		try {
			return await tasksManagerContract.deposit(roleId, {
				value: parseUnits(amount),
			});
		} catch (error) {
			handleSnackbar("Error setting deposit", "error");
		}
	}

	async function getScore(address: any) {
		try {
			return await tasksManagerContract.getScore(address);
		} catch (error) {
			handleSnackbar("Error getting Score", "error");
		}
	}

	async function getRoleName(roleId: any) {
		try {
			return await tasksManagerContract.getRoleName(roleId);
		} catch (error) {
			handleSnackbar("Error getting RoleName", "error");
		}
	}

	async function getMinQuorum() {
		try {
			return await tasksManagerContract.getMinQuorum();
		} catch (error) {
			handleSnackbar("Error getting the minimum quorum", "error");
		}
	}

	async function getQuorumApprovals(id: bigint) {
		try {
			return await tasksManagerContract.getQuorumApprovals(id);
		} catch (error) {
			handleSnackbar(
				"Error getting the total approvals for the task" + id,
				"error"
			);
		}
	}

	async function getReviews(id: bigint) {
		try {
			return await tasksManagerContract.getReviews(id);
		} catch (error) {
			handleSnackbar("Error getting the reviews array", "error");
		}
	}

	async function hasVoted(id: bigint, addr: any) {
		try {
			return await tasksManagerContract.hasVoted(id, addr);
		} catch (error) {
			handleSnackbar("Error getting amount of votes in taskId" + id, "error");
		}
	}

	async function hasLeaderRole(address: any) {
		try {
			return await tasksManagerContract.hasRole(UserRole.Leader, address);
		} catch (error) {
			console.log("Error while searching for user role.", error);
			return false;
		}
	}

	async function hasMemberRole(address: any) {
		try {
			return await tasksManagerContract.hasRole(UserRole.Member, address);
		} catch (error) {
			console.log("Error while searching for user role.", error);
			return false;
		}
	}

	async function _getSighash(functionName: string) {
		return tasksManagerContract.interface.getSighash(functionName);
	}

	async function _validateTask(id: bigint): Promise<Task> {
		try {
			// Fetch the task to test if its still valid
			const task = await getTask(id);

			// Return the task for external handling
			return task;
		} catch (error) {
			_unauthorizeUserError("Validate Task");
		}
	}

	async function _unauthorizeUserError(functionName: string) {
		const errDesc: string =
			"User unauthorized to perform " + functionName + "!";
		handleSnackbar(errDesc, "error");
	}

	return {
		createTask,
		startTask,
		reviewTask,
		completeTask,
		cancelTask,
		getTask,
		getMultiTasks,
		countUserTasks,
		countTasks,
		setRole,
		setRoleName,
		setOperator,
		hasLeaderRole,
		hasMemberRole,
		setMinQuorum,
		getQuorumApprovals,
		deposit,
		getScore,
		getMinQuorum,
		hasVoted,
		getReviews,
		getRoleName
	};
}
