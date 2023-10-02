import { Web3TaskContract } from "src/contracts/Web3Task";
import contractAddress from "src/contracts/contract-Web3Task-address.json";
import { Task } from 'src/models/task';
import { contract, tasksManagerContract } from '../wagmi'
import { ethers } from "ethers";


export function useTaskService() {

    async function createTask(task: Task) {
        await contract.createTask(task);
    }

    async function getTask(taskId: any) {
        return await contract.getTask(taskId);
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

    return { createTask, getTask, getMultiTasks, setRole, setOperator };

}
