import { useState } from "react";
import { Task } from 'src/models/task';
import { UserRole } from 'src/models/user';
import { tasksManagerContract } from '../wagmi'
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";
import { useSnackBar } from "src/contexts/SnackBarContext";
import { AlertColor } from '@mui/material/Alert';


export function useTaskService() {
    const { userAddress } = useWeb3Utils();
    const { showSnackBar } = useSnackBar();

    const handleSnackbar = (message: string, color: AlertColor) => {
        showSnackBar(message, color)
    };

    // Leader
    async function createTask(task: Task) {
        try {
            if (hasLeaderRole(userAddress())) {
                const intefaceID = tasksManagerContract.interface.getSighash("createTask");
                const isOperator = await tasksManagerContract.isOperator(intefaceID, UserRole.Leader);

                if (!isOperator) {
                    throw new Error("User unauthorized to perform createTask!");
                }

                await tasksManagerContract.createTask(task);

            } else {
                throw new Error("User does not have the leader role!");
            }
        } catch (error) {
            handleSnackbar(error.message, 'error');
        }
    }

    // Leader or Member
    async function startTask(id: bigint) {

        const isLeader = await hasLeaderRole(userAddress())
        const isMember = await hasMemberRole(userAddress())

        if (isLeader == true) {

            let intefaceID = tasksManagerContract.interface.getSighash("startTask");
            await tasksManagerContract.isOperator(intefaceID, (UserRole.Leader)).then(isOperator => {
                if (!isOperator) {
                    handleSnackbar("User unauthorized to perform startTask", 'error')
                    throw Error("User unauthorized to perform startTask!");
                } else {
                    tasksManagerContract.startTask(id, UserRole.Leader);
                }
            });
        } else {

            let intefaceID = tasksManagerContract.interface.getSighash("startTask");
            await tasksManagerContract.isOperator(intefaceID, (UserRole.Member)).then(isOperator => {
                if (!isOperator) {
                    handleSnackbar("User unauthorized to perform startTask", 'error')
                    throw Error("User unauthorized to perform startTask!");
                } else {
                    tasksManagerContract.startTask(id, UserRole.Member);
                }
            });
        }

    }

    // LEADER 
    async function reviewTask(id: bigint) {
        let metadata = "";
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("reviewTask");
            const isOperator = await tasksManagerContract.isOperator(intefaceID, UserRole.Leader)
            if (!isOperator) {
                handleSnackbar("User unauthorized to perform reviewTask!", "error");
                throw Error("User unauthorized to perform reviewTask!");
            } else {
                tasksManagerContract.reviewTask(id, UserRole.Leader, metadata);
            }
        }
    }

    // 1 Leader que pegou tarefa completeTask e 2 LEADERS Aprovam
    // 1 Membro que pegou tarefa completeTask e 2 LEADERS Aprovam
    async function completeTask(id: bigint) {
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("completeTask");
            const isOperator = await tasksManagerContract.isOperator(intefaceID, UserRole.Leader)
            if (!isOperator) {
                handleSnackbar("User unauthorized to perform completeTask!", "error");
                throw Error("User unauthorized to perform completeTask!");
            } else {
                tasksManagerContract.completeTask(id, UserRole.Leader);
            }
        }
    }

    // 1 Leader que pegou tarefa cancela a task e 2 LEADERS Aprovam
    // 1 Membro que pegou tarefa cancela a task e 2 LEADERS Aprovam
    async function cancelTask(id: bigint) {
        if (hasLeaderRole(userAddress())) {
            let intefaceID = tasksManagerContract.interface.getSighash("cancelTask");
            const isOperator = await tasksManagerContract.isOperator(intefaceID, UserRole.Leader)
            if (!isOperator) {
                handleSnackbar("User unauthorized to perform cancelTask!", "error");
                throw Error("User unauthorized to perform cancelTask!");
            } else {
                tasksManagerContract.cancelTask(id, UserRole.Leader);
            }
        }
    }

    async function countTasks() {
        try {
            return await tasksManagerContract.getTaskId();
        } catch (error) {
            handleSnackbar('Erro ao buscar a quantidade de tarefas.', 'error')
        }
    }

    async function countUserTasks() {
        try {
            let taskIds: bigint[] = [];
            taskIds = await tasksManagerContract.getUserTasks(userAddress());
            return taskIds.length+1;
        } catch (error) {
            handleSnackbar('Erro ao buscar a quantidade de tarefas do usuário.', 'error')
        }
    }


    async function getTask(taskId: any) {
        try {
            return await tasksManagerContract.getTask(taskId);
        } catch (error) {
            handleSnackbar('Erro ao buscar tarefa', 'error')
        }
    }

    async function getMultiTasks(min: number, max: number, isUserProfile: boolean) {
        /// Prepare the encoding of data and submit it to the contract
        const payloadArray = [];
        let taskIds: bigint[] = [];

        if (isUserProfile) {
            taskIds = await tasksManagerContract.getUserTasks(userAddress());
            if (taskIds && taskIds.length > 0) {
                for (var i = min; i <= max; i++) {
                    let id = Number(taskIds[i-1]);
                    if (!isNaN(id))
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
        try {
            return await tasksManagerContract.setRole(roleId, authorizedAddress, isAuthorized);
        } catch (error) {
            handleSnackbar('Erro ao setar Role', 'error')
        }
    }

    async function setOperator(interfaceId: any, roleId: any, isAuthorized: boolean) {
        try {
            return await tasksManagerContract.setOperator(interfaceId, roleId, isAuthorized);
        } catch (error) {
            handleSnackbar('Erro ao setar Operador', 'error')
        }
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
        countTasks,
        countUserTasks,
        getTask,
        getMultiTasks,
        setRole,
        setOperator,
        hasLeaderRole,
        hasMemberRole
    };

}
