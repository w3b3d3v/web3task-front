import { Web3TaskContract } from "src/contracts/Web3Task";
import contractAddress from "src/contracts/contract-Web3Task-address.json";
import { Task } from 'src/models/task';
import { getAddress } from "viem";
import { account, publicClient, walletClient } from '../wagmi'

export function useTaskService() {

    async function createTask(task: Task) {


        const address = getAddress(contractAddress.Web3Task);
        console.log("address", address)

        try {
            const { request } = await publicClient.simulateContract({
                ...Web3TaskContract,
                functionName: 'createTask',
                args: [task],
                account
            })

            console.log("request", request)

            request.then(res => {
                console.log("res", res)
                walletClient.writeContract(res.val());
                return res;
            })

        } catch (error) {
            console.log("error: ", error);
        }
        //const hash = await walletClient.writeContract(request)

    }

    return { createTask };

}


