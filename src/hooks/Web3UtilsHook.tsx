import { useAccount, useEnsName } from 'wagmi';
import { BigNumber, ethers } from "ethers";
import { useState } from 'react';

export function useWeb3Utils() {

  const { data: accountData } = useAccount();
  const { data: ensNameData } = useEnsName({ address: accountData?.address });
  const [userRole, setUserRole] = useState<any>();

  function shortenAddressOrEnsName(length = 5): string {
    const prefix = accountData?.address.slice(0, length + 2);
    const suffix = accountData?.address.slice(accountData?.address.length - length);

    return ensNameData ?? `${prefix}...${suffix}`;
  }

  function shortenAddressFromAddress(address: string, length = 5): string {
    const prefix = address.slice(0, length + 2);
    const suffix = address.slice(address.length - length);

    return `${prefix}...${suffix}`;
  }

  function shortenAddressFromUser(length = 5): string {
    const address = userAddress();
    let prefix = "";
    let suffix = "";
    if (address != null) {
      prefix = address.slice(0, length + 2);
      suffix = address.slice(address.length - length);
    }

    return `${prefix}...${suffix}`;
  }

  function userAddress(): string {
    return accountData?.address;
  }

  function setCurrentRole(role: any) {
    setUserRole(role);
  }

  function getUserRole(): any {
    return userRole;
  }

  function parseUnits(amount: string): BigNumber {
    return ethers.utils.parseUnits(amount, "ether");
  }

  return { shortenAddressOrEnsName, shortenAddressFromAddress, shortenAddressFromUser, userAddress, parseUnits, setCurrentRole, getUserRole };
}