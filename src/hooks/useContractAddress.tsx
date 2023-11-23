import { useEffect, useState } from 'react';
import { Address } from 'viem';
import { useNetwork } from 'wagmi';

import { ContractAddressByChain } from '@/contracts/addresses';
import { SupportedNetworks } from '@/lib/wagmi';

export const useContractAddress = () => {
  const [contractAddress, setContractAddress] = useState<Address>(ContractAddressByChain[80001][0]);

  const { chain } = useNetwork();

  useEffect(() => {
    const supportedChains = Object.values(SupportedNetworks);

    if (chain && supportedChains.includes(chain.id)) {
      setContractAddress(
        ContractAddressByChain[chain.id as SupportedNetworks][0]
      );
    }
  }, [chain]);

  return { contractAddress };
};
