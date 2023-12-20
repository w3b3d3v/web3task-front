import { useCallback } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { readContract } from '@wagmi/core';
import {
  Address,
  decodeFunctionResult,
  encodeFunctionData,
  getAbiItem,
  getFunctionSelector,
  parseEther,
} from 'viem';
import { toast } from 'react-toastify';

import { Task } from '@/models/task';
import { UserRole } from '@/models/user';
import { web3taskABI } from '@/contracts/web3taskABI';
import { useContractAddress } from '@/hooks/useContractAddress';
import { isDefined } from '@/lib/utils';

export function useTaskService() {
  const { address: userAddress } = useAccount();
  const { contractAddress } = useContractAddress();

  const createTaskMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'createTask',
  });
  const startTaskMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'startTask',
  });
  const reviewTaskMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'reviewTask',
  });
  const completeTaskMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'completeTask',
  });
  const cancelTaskMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'cancelTask',
  });
  const setRoleMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'setRole',
  });
  const setOperatorMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'setOperator',
  });
  const setMinQuorumMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'setMinQuorum',
  });
  const depositMutation = useContractWrite({
    address: contractAddress,
    abi: web3taskABI,
    functionName: 'deposit',
  });

  const hasLeaderRole = useCallback(async (address: Address) => {
    const hasRole = await readContract({
      address: contractAddress,
      abi: web3taskABI,
      functionName: 'hasRole',
      args: [BigInt(UserRole.Leader), address],
    });

    return hasRole;
  }, [contractAddress])

  const createTask = useCallback(async (task: Task) => {
    const isLeader = !!userAddress && (await hasLeaderRole(userAddress));

    if (!isLeader) {
      throw new Error('User does not have the leader role!');
    }

    const createTaskInterfaceID = getFunctionSelector(
      getAbiItem({
        abi: web3taskABI,
        name: 'createTask',
      })
    );

    const isOperator = await readContract({
      address: contractAddress,
      abi: web3taskABI,
      functionName: 'isOperator',
      args: [createTaskInterfaceID, BigInt(UserRole.Leader)],
    });

    if (!isOperator) {
      throw new Error('User unauthorized to perform createTask!');
    }

    await createTaskMutation.writeAsync({
      args: [task],
    });
  }, [contractAddress, createTaskMutation, hasLeaderRole, userAddress])

  const startTask = useCallback(async (id: bigint) => {
    try {
      const isLeader = !!userAddress && (await hasLeaderRole(userAddress));
      const startTaskInterfaceID = getFunctionSelector(
        getAbiItem({
          abi: web3taskABI,
          name: 'startTask',
        })
      );

      if (isLeader) {
        const isOperator = await readContract({
          address: contractAddress,
          abi: web3taskABI,
          functionName: 'isOperator',
          args: [startTaskInterfaceID, BigInt(UserRole.Leader)],
        });

        if (!isOperator) {
          throw Error('User unauthorized to perform startTask!');
        }

        await startTaskMutation.writeAsync({
          args: [id, BigInt(UserRole.Leader)],
        });

        return;
      }

      const isOperator = await readContract({
        address: contractAddress,
        abi: web3taskABI,
        functionName: 'isOperator',
        args: [startTaskInterfaceID, BigInt(UserRole.Member)],
      });

      if (!isOperator) {
        throw Error('User unauthorized to perform startTask!');
      }

      await startTaskMutation.writeAsync({
        args: [id, BigInt(UserRole.Member)],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Unexpected error');
      }
    }
  }, [contractAddress, hasLeaderRole, startTaskMutation, userAddress])

  const reviewTask = useCallback(async (id: bigint, metadata = '') => {
    try {
      const isLeader = !!userAddress && (await hasLeaderRole(userAddress));

      if (!userAddress || !isLeader) {
        throw new Error('User does not have the leader role!');
      }

      const reviewTaskInterfaceID = getFunctionSelector(
        getAbiItem({
          abi: web3taskABI,
          name: 'reviewTask',
        })
      );

      const isOperator = await readContract({
        address: contractAddress,
        abi: web3taskABI,
        functionName: 'isOperator',
        args: [reviewTaskInterfaceID, BigInt(UserRole.Leader)],
      });

      if (!isOperator) {
        throw Error('User unauthorized to perform reviewTask!');
      }

      reviewTaskMutation.writeAsync({
        args: [id, BigInt(UserRole.Leader), metadata],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Unexpected error');
      }
    }
  }, [contractAddress, hasLeaderRole, reviewTaskMutation, userAddress])

  const completeTask = useCallback(async (id: bigint) => {
    try {
      const isLeader = !!userAddress && (await hasLeaderRole(userAddress));

      if (!isLeader) {
        throw new Error('User does not have the leader role!');
      }

      const completeTaskInterfaceID = getFunctionSelector(
        getAbiItem({
          abi: web3taskABI,
          name: 'completeTask',
        })
      );

      const isOperator = await readContract({
        address: contractAddress,
        abi: web3taskABI,
        functionName: 'isOperator',
        args: [completeTaskInterfaceID, BigInt(UserRole.Leader)],
      });

      if (!isOperator) {
        throw Error('User unauthorized to perform completeTask!');
      }

      completeTaskMutation.writeAsync({
        args: [id, BigInt(UserRole.Leader)],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Unexpected error');
      }
    }
  }, [completeTaskMutation, contractAddress, hasLeaderRole, userAddress])

  const cancelTask = useCallback(async (id: bigint) => {
    try {
      const isLeader = !!userAddress && (await hasLeaderRole(userAddress));

      if (!isLeader) {
        throw new Error('User does not have the leader role!');
      }

      const cancelTaskInterfaceID = getFunctionSelector(
        getAbiItem({
          abi: web3taskABI,
          name: 'cancelTask',
        })
      );

      const isOperator = await readContract({
        address: contractAddress,
        abi: web3taskABI,
        functionName: 'isOperator',
        args: [cancelTaskInterfaceID, BigInt(UserRole.Leader)],
      });

      if (!isOperator) {
        throw Error('User unauthorized to perform cancelTask!');
      }

      cancelTaskMutation.writeAsync({
        args: [id, BigInt(UserRole.Leader)],
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Unexpected error');
      }
    }
  }, [cancelTaskMutation, contractAddress, hasLeaderRole, userAddress])

  const getTask = useCallback(async (taskId: bigint) => {
    try {
      return readContract({
        address: contractAddress,
        abi: web3taskABI,
        functionName: 'getTask',
        args: [taskId],
      });
    } catch (error) {
      toast.error(`Error searching task id: ${taskId}`);
    }
  }, [contractAddress])

  const getMultiTasks = useCallback(async (
    min: number,
    max: number,
    isUserProfile: boolean
  ) => {
    // Prepare the encoding of data and submit it to the contract
    const payloadArray: Address[] = [];
    let taskIds: bigint[] = [];

    if (isUserProfile) {
      if (!userAddress) {
        throw new Error('User address not found');
      }

      taskIds = await readContract({
        address: contractAddress,
        abi: web3taskABI,
        functionName: 'getUserTasks',
        args: [userAddress],
      }) as bigint[];

      if (taskIds && taskIds.length > 0) {
        for (var i = 0; i < taskIds.length; i++) {
          let id = Number(taskIds[i]);
          payloadArray.push(
            encodeFunctionData({
              abi: web3taskABI,
              functionName: 'getTask',
              args: [BigInt(id)],
            })
          );
        }
      }
    } else {
      for (var i = min; i <= max; i++) {
        taskIds.push(BigInt(i))
        payloadArray.push(
          encodeFunctionData({
            abi: web3taskABI,
            functionName: 'getTask',
            args: [BigInt(i)],
          })
        );
      }
    }

    const multiCallResponse = await readContract({
      address: contractAddress,
      abi: web3taskABI,
      functionName: 'multicallRead',
      args: [payloadArray],
    });

    // Map the results to the function name and the decoded arguments
    const decodedResults = multiCallResponse.map((response, index) => {
        try {
          const decodedArgs = decodeFunctionResult({
            abi: web3taskABI,
            functionName: 'getTask',
            data: response,
          });

          const taskId = taskIds[index]
  
          return {
            name: getAbiItem({
              abi: web3taskABI,
              name: 'getTask',
            }).name,
            args: {
              taskId,
              ...decodedArgs
            },
          };

        } catch (error) {
          return undefined
        }
    });

    const filteredResults = decodedResults.filter(isDefined)

    return filteredResults;
  }, [contractAddress, userAddress])

  const setRole = useCallback(async (
    roleId: bigint,
    authorizedAddress: Address,
    isAuthorized: boolean
  ) => {
    try {
      return setRoleMutation.writeAsync({
        args: [roleId, authorizedAddress, isAuthorized],
      });
    } catch (error) {
      toast.error(
        `Error setting role id ${roleId} to address ${authorizedAddress}`
      );
    }
  }, [setRoleMutation])

  const setOperator = useCallback(async (
    interfaceId: Address,
    roleId: bigint,
    isAuthorized: boolean
  ) => {
    try {
      return setOperatorMutation.writeAsync({
        args: [interfaceId, roleId, isAuthorized],
      });
    } catch (error) {
      toast.error(
        `Error setting operator to interface id ${interfaceId}, role id ${roleId}`
      );
    }
  }, [setOperatorMutation])

  const setMinQuorum = useCallback(async (quorum: bigint) => {
    try {
      return setMinQuorumMutation.writeAsync({
        args: [quorum],
      });
    } catch (error) {
      toast.error(`Error setting quorum ${quorum}`);
    }
  }, [setMinQuorumMutation])

  const deposit = useCallback(async (roleId: bigint, amount: string) => {
    try {
      return depositMutation.writeAsync({
        args: [roleId],
        value: parseEther(amount),
      });
    } catch (error) {
      toast.error(
        `Error setting deposit for role id ${roleId} of amount ${amount}`
      );
    }
  }, [depositMutation])

  const hasMemberRole = useCallback(async (address: Address) => {
    const hasRole = await readContract({
      address: contractAddress,
      abi: web3taskABI,
      functionName: 'hasRole',
      args: [BigInt(UserRole.Member), address],
    });

    return hasRole;
  }, [contractAddress])

  return {
    createTask,
    startTask,
    reviewTask,
    completeTask,
    cancelTask,
    getTask,
    getMultiTasks,
    setRole,
    setOperator,
    hasLeaderRole,
    hasMemberRole,
    setMinQuorum,
    deposit,
  };
}
