import abiTask from "./TasksManager.json";
import Web3Task from "./contract-Web3Task-address.json";
import abiWeb3 from "./Web3Task.json";

export const Contract418 = {
  address: Web3Task.Web3Task,
  abiTask: abiWeb3.abi,
  abi: abiTask.abi,
} as const;
