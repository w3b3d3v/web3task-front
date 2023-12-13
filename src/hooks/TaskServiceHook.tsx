import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Address } from 'viem';

import { TaskFront, TaskStatus } from '@/models/task';
import { useWeb3Utils } from '@/hooks/Web3UtilsHook';
import { useTaskService } from '@/services/tasks-service';

export const useTaskServiceHook = () => {
    const [taskData, setTaskData] = useState<TaskFront | null>(null);
    const [multiTasksData, setMultiTasksData] = useState<TaskFront[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { shortenAddressFromAddress } = useWeb3Utils();
    const {
      getTask,
      getMultiTasks,
      setRole,
      setOperator,
      setMinQuorum,
      deposit,
    } = useTaskService();

    /**
     * getStatus
     *
     * Return status string according enum TaskStatus
     *
     * @async
     * @function
     * @param taskId - The ID of the task to fetch.
     * @returns - A promise that resolves when data is fetched.
     */
    function getStatus(status: TaskStatus): string {
        switch (status) {
            case TaskStatus.Created:
                return "Created"
            case TaskStatus.Canceled:
                return "Canceled"
            case TaskStatus.Review:
                return "In Review"
            case TaskStatus.Progress:
                return "In Progress"
            case TaskStatus.Completed:
                return "Completed"
            default:
                break;
        }
        return "";
    }

    /**
     * handleTask
     *
     * Fetches data obtained from the Solidity contract function getTask().
     *
     * @async
     * @function
     * @param taskId - The ID of the task to fetch.
     * @returns - A promise that resolves when data is fetched.
     */
    const handleTask = async (taskId: bigint) => {

        try {
            setLoading(true);
            setError(null);

            const result: any = await getTask(taskId);

            let nft: TaskFront = {
                taskId: taskId,
                status: getStatus(result.status),
                title: result.title,
                description: result.description,
                reward: result.reward.toString(),
                endDate: result.endDate.toString(),
                authorizedRoles: result.authorizedRoles.toString(),
                creatorRole: result.creatorRole.toString(),
                assignee: result.assignee,
                metadata: result.metadata
            }

            const shortenedAddressOrName = shortenAddressFromAddress(nft.assignee);
            nft.assignee = shortenedAddressOrName;
            //const d = new Date(Number(nft.endDate));
            //nft.endDate = d.toDateString();


            const timeInSeconds = Math.floor(Number(nft.endDate) * 1000);
            const date = new Date(timeInSeconds);
            const dateFormatted = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            nft.endDate = dateFormatted;
            setTaskData(nft);
        } catch (error) {
            setError('Erro ao buscar tarefa');
            toast.error('Error Searching Task: ' + error)
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleMultiTask
     *
     * Fetches data obtained from the Solidity contract function getTask() + Multicall.
     *
     * @async
     * @function
     * @param start - The start index for fetching multiple tasks.
     * @param end - The end index for fetching multiple tasks.
     * @returns  - A promise that resolves when data is fetched.
     */

    const handleMultiTask = useCallback(async (start: number, end: number, isUserProfile: boolean) => {
      const result = await getMultiTasks(start, end, isUserProfile);

      const multiTask = [];
      try {
          setLoading(true);
          setError(null);

          for (let i = 0; i < result.length; i++) {
              const arg = result[i].args;

              let nft: TaskFront = {
                  taskId: arg.taskId,
                  status: arg.status.toString(),
                  title: arg.title,
                  description: arg.description,
                  reward: arg.reward.toString(),
                  endDate: arg.endDate.toString(),
                  authorizedRoles: arg.authorizedRoles.toString(),
                  creatorRole: arg.creatorRole.toString(),
                  assignee: arg.assignee,
                  metadata: arg.metadata
              }

              if (Number(nft.creatorRole) != 0) {
                  multiTask.push(nft);
                  setMultiTasksData(multiTask);
              }
          }
      } catch (error) {
          setError('Erro ao buscar tarefas múltiplas' + error);
      } finally {
          setLoading(false);
      }
  }, [getMultiTasks]);

    const handleRole = async (roleId: bigint, authorizedAddress: Address, isAuthorized: boolean) => {
        try {
            toast.info('Set Role process initiated with success!')
            return await setRole(roleId, authorizedAddress, isAuthorized);
        } catch (error) {
            toast.error('Error Set Role!')
        }

    };

    const handleOperator = async (interfaceId: Address, roleId: bigint, isAuthorized: boolean) => {
        try {
            toast.info('Set Operator process initiated with success!')
            return await setOperator(interfaceId, roleId, isAuthorized);
        } catch (error) {
            toast.error('Error Set Operator!')
        }

    };

    const handleQuorum = async (quorum: bigint) => {
        try {
            toast.info('Set Quorum process initiated with success!')
            return await setMinQuorum(quorum);
        } catch (error) {
            toast.error('Error Set Quorum!')
        }
    };

    const handleDeposit = async (roleId: bigint, amount: string) => {
        try {
            toast.info('Set Deposit process initiated with success!')
            return await deposit(roleId, amount);
        } catch (error) {
            toast.error('Error Set Deposit!')
        }
    };

    return {
        taskData,
        multiTasksData,
        loading,
        error,
        handleTask,
        handleMultiTask,
        handleRole,
        handleOperator,
        handleQuorum,
        handleDeposit
    };
};