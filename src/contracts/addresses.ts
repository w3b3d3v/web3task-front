import { SupportedNetworks } from "@/lib/wagmi";
import { Address } from "viem";

enum Contracts {
  "web3task",
}

export const ContractAddressByChain: Record<
  SupportedNetworks,
  Record<Contracts, Address>
> = {
  [SupportedNetworks.Polygon]: {
    [Contracts.web3task]: "0x786752a02AdcED82dF9bB39A3369fF7b3097A0F4",
  },
  [SupportedNetworks.Mumbai]: {
    [Contracts.web3task]: "0x13aaf3C188f85C5131De45aF17c8B775176ce64D",
  },
  [SupportedNetworks.GoChain]: {
    [Contracts.web3task]: "0xeC20dCBf0380F1C9856Ee345aF41F62Ee45a95a1",
  },
};