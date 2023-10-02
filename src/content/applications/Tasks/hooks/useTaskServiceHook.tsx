import { useState } from 'react';
import { Task, TaskFront } from 'src/models/task';

/**
 * Interface for the Task Service, defining methods to interact with tasks.
 */
interface TaskService {
    getTask: (taskId: number) => Promise<Task>;
    getMultiTasks: (start: number, end: number) => Promise<Task[]>;
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
                status: result.status,
                title: result.title,
                description: result.description,
                reward: result.reward.toString(),
                endDate: result.endDate.toString(),
                authorizedRoles: result.authorizedRoles.toString(),
                creatorRole: result.creatorRole.toString(),
                assignee: result.assignee,
                metadata: result.metadata
            }

            setTaskData(nft);
        } catch (error) {
            setError('Erro ao buscar tarefa');
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

    const handleMultiTask = async (start: number, end: number) => {

        const result: any = await task.getMultiTasks(start, end);

        let multiTask = [];
        try {
            setLoading(true);
            setError(null);

            for (let i = 0; i < result.length; i++) {
                const args = result[i].args[0];
                let nft: TaskFront = {
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

        return await task.setRole(roleId, authorizedAddress, isAuthorized);
    };

    const handleOperator = async (interfaceId: any, roleId: any, isAuthorized: boolean) => {
        console.log('interfaceId ', interfaceId)
        console.log('roleId ', roleId)
        console.log('isAuthorized ', isAuthorized)

        return await task.setOperator(interfaceId, roleId, isAuthorized);
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