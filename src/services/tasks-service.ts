import { Web3TaskContract } from "src/contracts/Web3Task";
import contractAddress from "src/contracts/contract-Web3Task-address.json";
import { Task } from 'src/models/task';
import { contract, TasksManagerContract } from '../wagmi'
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
            payloadArray.push(TasksManagerContract.interface.encodeFunctionData("getTask", [i]));
        }
        const response = await TasksManagerContract.multicallRead(payloadArray);

        /// Decode the results
        let decodedResults = [];
        /// Get the sighash of the function
        let getTaskID = TasksManagerContract.interface.getSighash("getTask(uint256)");
        /// Map the results to the function name and the decoded arguments
        decodedResults = response.map((res: any) => {
            try {
                const decodedArgs = TasksManagerContract.interface.decodeFunctionResult(
                    getTaskID,
                    res
                );
                return {
                    name: TasksManagerContract.interface.getFunction(getTaskID).name,
                    args: decodedArgs,
                };
            } catch (error) {
                console.log("Could not decode result", error);
            }
        });

        return decodedResults;

    }

    return { createTask, getTask, getMultiTasks };

}
