import { useState } from 'react';
import { Task, TaskStatus, TaskFront } from 'src/models/task';
import { useWeb3Utils } from 'src/hooks/Web3UtilsHook';
import { useSnackBar } from 'src/contexts/SnackBarContext';
import { AlertColor } from '@mui/material/Alert';

/**
 * Interface for the Task Service, defining methods to interact with tasks.
 */
interface TaskService {
    getTask: (taskId: number) => Promise<Task>;
    getMultiTasks: (start: number, end: number, isUserProfile: boolean) => Promise<Task[]>;
    setRole: (roleId: any, authorizedAddress: any, isAuthorized: boolean) => Promise<any>
    setOperator: (interfaceId: any, roleId: any, isAuthorized: boolean) => Promise<any>
}

/**
 * Hook for managing task-related data and interactions.
 * 
 * @param task - An instance of the TaskService interface.
 * @returns An object containing task-related state and functions.
 */
export const useTaskServiceHook = (task: TaskService) => {
    const [taskData, setTaskData] = useState(null);
    const [multiTasksData, setMultiTasksData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { shortenAddressFromAddress } = useWeb3Utils();
    const { showSnackBar } = useSnackBar();

    const handleSnackbar = (message: string, color: AlertColor) => {
        showSnackBar(message, color)
    };


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
                break;
            case TaskStatus.Canceled:
                return "Canceled"
                break;
            case TaskStatus.Review:
                return "In Review"
                break;
            case TaskStatus.Progress:
                return "In Progress"
                break;
            case TaskStatus.Completed:
                return "Completed"
                break;
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
    const handleTask = async (taskId: number) => {

        try {
            setLoading(true);
            setError(null);

            const result: any = await task.getTask(taskId);

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
            handleSnackbar('Error Searching Task', 'error')
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

    const handleMultiTask = async (start: number, end: number, isUserProfile: boolean) => {

        const result: any = await task.getMultiTasks(start, end, isUserProfile);

        let multiTask = [];
        try {
            setLoading(true);
            setError(null);

            for (let i = 0; i < result.length; i++) {
                const args = result[i].args[0];
                let nft: TaskFront = {
                    taskId: args.taskId,
                    status: args.status,
                    title: args.title,
                    description: args.description,
                    reward: args.reward.toString(),
                    endDate: args.endDate.toString(),
                    authorizedRoles: args.authorizedRoles.toString(),
                    creatorRole: args.creatorRole.toString(),
                    assignee: args.assignee,
                    metadata: args.metadata
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
    };

    const handleRole = async (roleId: any, authorizedAddress: any, isAuthorized: boolean) => {
        console.log('roleId ', roleId)
        console.log('authorizedAddress ', authorizedAddress)
        console.log('isAuthorized ', isAuthorized)

        try {
            handleSnackbar('Set Role process initiated with success!', 'info')
            return await task.setRole(roleId, authorizedAddress, isAuthorized);
        } catch (error) {
            handleSnackbar('Error Set Role!', 'error')
        }

    };

    const handleOperator = async (interfaceId: any, roleId: any, isAuthorized: boolean) => {
        console.log('interfaceId ', interfaceId)
        console.log('roleId ', roleId)
        console.log('isAuthorized ', isAuthorized)

        try {
            handleSnackbar('Set Operator process initiated with success!', 'info')
            return await task.setOperator(interfaceId, roleId, isAuthorized);
        } catch (error) {
            handleSnackbar('Error Set Operator!', 'error')
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
        handleOperator
    };
};