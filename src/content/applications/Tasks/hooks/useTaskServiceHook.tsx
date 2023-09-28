import { useState } from 'react';
import { Task, TaskFront } from 'src/models/task';

interface TaskService {
    getTask: (taskId: number) => Promise<Task>;
    getMultiTasks: (start: number, end: number) => Promise<Task[]>;
}

export const useTaskServiceHook = (task: TaskService) => {
    const [taskData, setTaskData] = useState(null);
    const [multiTasksData, setMultiTasksData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTask = async (taskId: number) => {
        try {
            setLoading(true);
            setError(null);
            const result = await task.getTask(taskId);
            setTaskData(result);
        } catch (error) {
            setError('Erro ao buscar tarefa');
        } finally {
            setLoading(false);
        }
    };

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

    return {
        taskData,
        multiTasksData,
        loading,
        error,
        handleTask,
        handleMultiTask,
    };
};