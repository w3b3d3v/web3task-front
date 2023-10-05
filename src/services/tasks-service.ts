import { useState } from "react";
import { Task } from 'src/models/task';
import { UserRole } from 'src/models/user';
import { tasksManagerContract } from '../wagmi'
import { is } from 'date-fns/locale';
import { useWeb3Utils } from "src/hooks/Web3Utils";

export function useTaskService() {
    const [loading, setLoading] = useState<boolean>(false);
    const [operator, isOperator] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<UserRole>();    
    const { userAddress } = useWeb3Utils();


    async function createTask(task: Task) {
        if (hasLeaderRole(userAddress())){
            let intefaceID = tasksManagerContract.interface.getSighash("createTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => { 
                if (!isOperator)
                    throw Error("User unauthorized to perform createTask!");   
                
                tasksManagerContract.createTask(task);         
            });     
        }          
    }

    async function startTask(id: bigint) {
        if (hasLeaderRole(userAddress()) || hasMemberRole(userAddress())){
            let intefaceID = tasksManagerContract.interface.getSighash("startTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => { 
                if (!isOperator)
                    throw Error("User unauthorized to perform startTask!");   
                
                tasksManagerContract.startTask(id, UserRole.Member);         
            });     
        }
    }

    async function reviewTask(id: bigint) {
        let metadata = "";
        if (hasLeaderRole(userAddress())){
            let intefaceID = tasksManagerContract.interface.getSighash("reviewTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => { 
                if (!isOperator)
                    throw Error("User unauthorized to perform reviewTask!");   
                
                tasksManagerContract.reviewTask(id, UserRole.Leader, metadata);         
            });     
        }
    }

    async function completeTask(id: bigint) {
        if (hasLeaderRole(userAddress())){
            let intefaceID = tasksManagerContract.interface.getSighash("completeTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => { 
                if (!isOperator)
                    throw Error("User unauthorized to perform completeTask!");   
                
                tasksManagerContract.completeTask(id, UserRole.Member);         
            });     
        }
    }

    async function cancelTask(id: bigint) {
        if (hasLeaderRole(userAddress())){
            let intefaceID = tasksManagerContract.interface.getSighash("cancelTask");
            await tasksManagerContract.isOperator(intefaceID, UserRole.Leader).then(isOperator => { 
                if (!isOperator)
                    throw Error("User unauthorized to perform cancelTask!");   
                
                tasksManagerContract.cancelTask(id, UserRole.Member);         
            });     
        }
    }

    async function getTask(taskId: any) {
        return await tasksManagerContract.getTask(taskId);
    }

    async function getMultiTasks(min: number, max: number) {
        /// Prepare the encoding of data and submit it to the contract
        const payloadArray = [];
        for (var i = 1; i <= 10; i++) {
            payloadArray.push(tasksManagerContract.interface.encodeFunctionData("getTask", [i]));
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

    return { createTask, startTask, reviewTask, completeTask, cancelTask, getTask, getMultiTasks, setRole, setOperator, hasLeaderRole, hasMemberRole };

}
