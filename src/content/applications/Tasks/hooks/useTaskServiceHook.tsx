import { useState } from 'react';
import { Task } from 'src/models/task';

interface TaskService {
    getTask: (taskId: number) => Promise<Task>;
    getMultiTasks: (start: number, end: number) => Promise<Task[]>;
}

export const useTaskServiceHook = (task: TaskService) => {
    const [taskData, setTaskData] = useState(null);
    const [multiTasksData, setultiTasksData] = useState(null);
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
        try {
            setLoading(true);
            setError(null);
            const result = await task.getMultiTasks(start, end);
            setultiTasksData(result);
        } catch (error) {
            setError('Erro ao buscar tarefas múltiplas');
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