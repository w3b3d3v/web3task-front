import { useState } from 'react';
import { Task, TaskStatus, TaskFront } from 'src/models/task';
import { useWeb3Utils } from 'src/hooks/Web3UtilsHook';
import { useSnackBar } from 'src/contexts/SnackBarContext';
import { AlertColor } from '@mui/material/Alert';

/**
 * Interface for the Task Service, defining methods to interact with tasks.
 */
interface TaskService {
    countUserTasks: () => Promise<number>;
    countTasks: () => Promise<number>;
    getTask: (taskId: number) => Promise<Task>;
    getMultiTasks: (start: number, end: number, isUserProfile: boolean) => Promise<Task[]>;
    setRole: (roleId: any, authorizedAddress: any, isAuthorized: boolean) => Promise<any>
    setRoleName: (roleId: any, roleName: any) => Promise<any>
    setOperator: (interfaceId: any, roleId: any, isAuthorized: boolean) => Promise<any>
    setMinQuorum: (quorum: any) => Promise<any>
    deposit: (roleId: any, amount: any) => Promise<any>
    getScore: (address: any) => Promise<any>
    getReviews: (taskId: any) => Promise<any>
}

/**
 * Hook for managing task-related data and interactions.
 * 
 * @param task - An instance of the TaskService interface.
 * @returns An object containing task-related state and functions.
 */
export const useTaskServiceHook = (task: TaskService) => {
    const [taskData, setTaskData] = useState(null);
    const [taskReview, setTaskReview] = useState<string[]>(null);
    const [multiTasksData, setMultiTasksData] = useState(null);
    const [countTasks, setCountTasks] = useState(null);
    const [countUserTasks, setCountUserTasks] = useState(null);
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
            case TaskStatus.Canceled:
                return "Canceled"
            case TaskStatus.Review:
                return "Review"
            case TaskStatus.Progress:
                return "Progress"
            case TaskStatus.Completed:
                return "Completed"
            default:
                break;
        }
        return "";
    }

    /**
     * handleCountTasks
     *
     * Fetches count tasks obtained from the Solidity contract function countTasks().
     *
     * @async
     * @function
     * @returns - A promise that resolves when data is fetched.
     */
    const handleCountTasks = async () => {

        try {
            setLoading(true);
            setError(null);

            const countTasks: any = await task.countTasks();
            setCountTasks(countTasks);


        } catch (error) {
            setError('Error searching total of tasks.');
            handleSnackbar('Error searching total of tasks: ' + error, 'error')
        }
        return countTasks;
    }

    /**
     * handleCountUserTasks
     *
     * Fetches count user tasks obtained from the Solidity contract function countTasks().
     *
     * @async
     * @function
     * @returns - A promise that resolves when data is fetched.
     */
    const handleCountUserTasks = async () => {

        try {
            setLoading(true);
            setError(null);

            const countTasks: any = await task.countUserTasks();
            setCountUserTasks(countTasks);
        } catch (error) {
            setError('Error searching total of tasks.');
            handleSnackbar('Error searching total of tasks: ' + error, 'error')
        }
        return countTasks;
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

            const timeInSeconds = Math.floor(Number(nft.endDate) * 1000);
            const date = new Date(timeInSeconds);
            const dateFormatted = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
            nft.endDate = dateFormatted;
            setTaskData(nft);
        } catch (error) {
            setError('Error Searching Task');
            handleSnackbar('Error Searching Task: ' + error, 'error')
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
            setError('Error when loading multiple tasks' + error);
        } finally {
            setLoading(false);
        }
    };

    const handleRole = async (roleId: any, authorizedAddress: any, isAuthorized: boolean) => {
        try {
            handleSnackbar('Set Role process initiated with success!', 'info')
            return await task.setRole(roleId, authorizedAddress, isAuthorized);
        } catch (error) {
            handleSnackbar('Error Set Role!', 'error')
        }

    };

    const handleOperator = async (interfaceId: any, roleId: any, isAuthorized: boolean) => {
        try {
            handleSnackbar('Set Operator process initiated with success!', 'info')
            return await task.setOperator(interfaceId, roleId, isAuthorized);
        } catch (error) {
            handleSnackbar('Error Set Operator!', 'error')
        }

    };

    const handleRoleName = async (roleId: any, roleName: any) => {
        try {
            handleSnackbar('Set RoleName process initiated with success!', 'info')
            return await task.setRoleName(roleId, roleName);
        } catch (error) {
            handleSnackbar('Error Set RoleName!', 'error')
        }
    };

    const handleQuorum = async (quorum: any) => {
        try {
            handleSnackbar('Set Quorum process initiated with success!', 'info')
            return await task.setMinQuorum(quorum);
        } catch (error) {
            handleSnackbar('Error Set Quorum!', 'error')
        }
    };

    const handleDeposit = async (roleId: any, amount: any) => {
        try {
            handleSnackbar('Set Deposit process initiated with success!', 'info')
            return await task.deposit(roleId, amount);
        } catch (error) {
            handleSnackbar('Error Set Deposit!', 'error')
        }
    };

    const handleUserScore = async (address: any) => {
        try {
            return await task.getScore(address);
        } catch (error) {
            handleSnackbar('Error getting Score', 'error')
        }
    };

    const handleReview = async (taskId: any) => {
        try {
            const result: any = await task.getReviews(taskId)
            setTaskReview(result)
            return result;
        } catch (error) {
            handleSnackbar('Error getting the reviews array', 'error')
        }
    }

    return {
        taskData,
        taskReview,
        multiTasksData,
        countTasks,
        countUserTasks,
        loading,
        error,
        handleTask,
        handleMultiTask,
        handleCountTasks,
        handleCountUserTasks,
        handleRole,
        handleOperator,
        handleQuorum,
        handleDeposit,
        handleUserScore,
        handleReview,
        handleRoleName
    };
};