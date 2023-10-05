import { Box } from "@mui/material";
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/content/applications/Tasks/hooks/useTaskServiceHook";
import { useEffect } from "react";
import CardMultiTasks from "../CardMultiTasks";
import CoverTasks from "../CoverTasks";

const HomeTask = () => {

    const taskService = useTaskService();

    const { handleMultiTask, multiTasksData, loading, error } = useTaskServiceHook(taskService);

    useEffect(() => {
        const fetchData = async () => {
            await handleMultiTask(0, 10);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (multiTasksData && !loading) {
            console.log('multiTasksData', multiTasksData);
        } else {
            console.error(error);
        }
    }, []);

    return (
        <>

            <Box>

                <CoverTasks />

                <Box>
                    <Box height={40} bgcolor={'#8EFFC2'} />


                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >
                        <Box>

                        </Box>

                        <CardMultiTasks multiTasksData={multiTasksData} loading={loading} />
                    </Box >
                </Box>

            </Box >

        </>
    )
}

export default HomeTask