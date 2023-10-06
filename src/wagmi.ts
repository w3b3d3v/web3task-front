import { Web3TaskContract } from "src/contracts/Web3Task";
import { TasksManager } from "./contracts/TasksManager";
import contractAddress from "src/contracts/contract-Web3Task-address.json";
import { ethers } from "ethers";
import { chain, createClient, defaultChains, useAccount } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const alchemyId = process.env.ALCHEMY_API_KEY as string
const chains = defaultChains
const defaultChain = chain.mainnet

export const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
      : chain.rpcUrls.default
    return [
      new MetaMaskConnector({ chains })
    ]
  },
})

let signer = null;

let provider;
if (window.ethereum == null) {

  // If MetaMask is not installed, we use the default provider,
  // which is backed by a variety of third-party services (such
  // as INFURA). They do not have private keys installed so are
  // only have read-only access
  console.log("MetaMask not installed; using read-only defaults")
  provider = ethers.getDefaultProvider(1)

} else {

  // Connect to the MetaMask EIP-1193 object. This is a standard
  // protocol that allows Ethers access to make all read-only
  // requests through MetaMask.
  //await window.ethereum.send('eth_requestAccounts');

  provider = new ethers.providers.Web3Provider(window.ethereum)

  // It also provides an opportunity to request access to write
  // operations, which will be performed by the private key
  // that MetaMask manages for the user.
  signer = provider.getSigner();
}


export const web3TaskContract = new ethers.Contract(
  contractAddress.Web3Task,
  Web3TaskContract.abi,
  signer
);

export const tasksManagerContract = new ethers.Contract(
  contractAddress.Web3Task,
  TasksManager.abi,
  signer
);
