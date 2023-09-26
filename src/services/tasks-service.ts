import { Web3TaskContract } from "src/contracts/Web3Task";
import contractAddress from "src/contracts/contract-Web3Task-address.json";
import { Task } from 'src/models/task';
import { contract } from '../wagmi'
import { ethers } from "ethers";


export function useTaskService() {

    async function createTask(task: Task) {
        await contract.createTask(task);
    }

    async function getTask(taskId: bigint) {
        return await contract.getTask(taskId);
    }

    return { createTask, getTask };

}


