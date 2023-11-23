import { configureChains, createConfig } from "wagmi";
import { polygon, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

export enum SupportedNetworks {
  "Polygon" = 137,
  "Mumbai" = 80001,
  "GoChain" = 31337
}

export const ENV_DEFAULT_CHAIN_ID = process.env.NEXT_PUBLIC_USE_TESTNET
  ? SupportedNetworks.Mumbai
  : SupportedNetworks.Polygon;

const apiKey = process.env.NEXT_PUBLIC_USE_TESTNET
  ? process.env.NEXT_PUBLIC_ALCHEMY_TESTNET_KEY
  : process.env.NEXT_PUBLIC_ALCHEMY_KEY;

const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [alchemyProvider({ apiKey: apiKey ?? "" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "web3task",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, wagmiConfig };