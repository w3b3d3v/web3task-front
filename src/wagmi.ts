import { configureChains, createConfig } from 'wagmi'
import { goerli, localhost, mainnet } from 'viem/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

import { publicProvider } from 'wagmi/providers/public'

import { createPublicClient, createWalletClient, custom, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

const { chains, webSocketPublicClient } = configureChains(
  [localhost, goerli, mainnet],
  [publicProvider()],
)

// JSON-RPC Account
export const [account] = await walletClient.getAddresses()

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  publicClient,
  webSocketPublicClient,
})



