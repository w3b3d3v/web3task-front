import { useAccount, useEnsName } from 'wagmi';

export function useWeb3Utils() {

    const { address } = useAccount();
    const { data: ensNameData } = useEnsName({ address });
    
    function shortenAddressOrEnsName(length = 5): string {
      const prefix = address?.slice(0, length + 2);
      const suffix = address?.slice(address.length - length);
  
      return ensNameData ?? `${prefix}...${suffix}`;
    }

    function shortenAddressFromAddress(address: string, length = 5): string {
      const prefix = address.slice(0, length + 2);
      const suffix = address.slice(address.length - length);
  
      return `${prefix}...${suffix}`;
    }

    function shortenAddressFromUser(length = 5): string {
      const address = userAddress();
      const prefix = address?.slice(0, length + 2);
      const suffix = address?.slice(address.length - length);
  
      return `${prefix}...${suffix}`;
    }

    function userAddress() {      
      return address;
    }
  
    return { shortenAddressOrEnsName, shortenAddressFromAddress, shortenAddressFromUser, userAddress };
  }

 