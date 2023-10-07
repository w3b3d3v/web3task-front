import { useState } from "react";
import { Task } from 'src/models/task';
import { UserRole } from 'src/models/user';
import { web3TaskContract, tasksManagerContract } from '../wagmi'
import { is } from 'date-fns/locale';
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";

export function useTaskService() {
    const { userAddress } = useWeb3Utils();
    const [tasks, setTasks] = useState<any>()

    async function createTask(task: Task) {
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("createTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => {
                if (!isOperator)
                    throw Error("User unauthorized to perform createTask!");

                web3TaskContract.createTask(task).error(error => {
                    throw Error("Error performing createTask: " + error.data.message);
                }
                );
            });
        }
    }

    async function startTask(id: bigint) {
        if (hasLeaderRole(userAddress()) || hasMemberRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("startTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => {
                if (!isOperator)
                    throw Error("User unauthorized to perform startTask!");

                web3TaskContract.startTask(id, UserRole.Member);
            });
        }
    }

    async function reviewTask(id: bigint) {
        let metadata = "";
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("reviewTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => {
                if (!isOperator)
                    throw Error("User unauthorized to perform reviewTask!");

                web3TaskContract.reviewTask(id, UserRole.Leader, metadata);
            });
        }
    }

    async function completeTask(id: bigint) {
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("completeTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => {
                if (!isOperator)
                    throw Error("User unauthorized to perform completeTask!");

                web3TaskContract.completeTask(id, UserRole.Member);
            });
        }
    }

    async function cancelTask(id: bigint) {
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("cancelTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => {
                if (!isOperator)
                    throw Error("User unauthorized to perform cancelTask!");

                web3TaskContract.cancelTask(id, UserRole.Member);
            });
        }
    }

    async function getTask(taskId: any) {
        return await tasksManagerContract.getTask(taskId);
    }

    async function getMultiTasks(min: number, max: number, isUserProfile: boolean) {
        /// Prepare the encoding of data and submit it to the contract
        const payloadArray = [];
        let taskIds: bigint[] = [];

        if (isUserProfile) {
            taskIds = await tasksManagerContract.getUserTasks(userAddress());
            if (taskIds && taskIds.length > 0) {
                for (var i = 0; i < taskIds.length; i++) {
                    let id = Number(taskIds[i]);
                    payloadArray.push(tasksManagerContract.interface.encodeFunctionData("getTask", [id]));
                }
            }
        } else {
            for (var i = min; i <= max; i++) {
                payloadArray.push(tasksManagerContract.interface.encodeFunctionData("getTask", [i]));
            }
        }

        const response = await tasksManagerContract.multicallRead(payloadArray);

        /// Decode the results
        let decodedResults = [];
        /// Get the sighash of the function
        let getTaskID = tasksManagerContract.interface.getSighash("getTask(uint256)");
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

    async function setRole(roleId: any, authorizedAddress: any, isAuthorized: boolean) {

        return await tasksManagerContract.setRole(roleId, authorizedAddress, isAuthorized);
    }

    async function setOperator(interfaceId: any, roleId: any, isAuthorized: boolean) {

        return await tasksManagerContract.setOperator(interfaceId, roleId, isAuthorized);
    }

    async function hasLeaderRole(address: any) {
        return await tasksManagerContract.hasRole(UserRole.Leader, address);
    }

    async function hasMemberRole(address: any) {
        return await tasksManagerContract.hasRole(UserRole.Member, address);
    }

    return {
        createTask,
        startTask,
        reviewTask,
        completeTask,
        cancelTask,
        getTask,
        getMultiTasks,
        setRole,
        setOperator,
        hasLeaderRole,
        hasMemberRole
    };

}
