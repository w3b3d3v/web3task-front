import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import CardMultiTasks from "../../../components/Task/CardMultiTasks";
import CoverHomeTasks from "../../../components/Cover/CoverHomeTasks";
import usePagination from "src/components/Pagination";
import SearchFilters from "src/components/Task/SearchFiltersTasks";
import { useSearchFilters } from "src/hooks/useSearchFilters";
import { Helmet } from "react-helmet-async";

const HomeTasks = () => {
    const taskService = useTaskService();

    const { handleCountTasks, handleMultiTask, multiTasksData, loading } = useTaskServiceHook(taskService);
    const theme = useTheme();
    const { filter: filterTasks } = useSearchFilters();
    const [tasksPerPage, setTasksPerPage] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [maxTasks, setMaxTasks] = useState<number>(20);
    const [minimumTasks, setMinimumTasks] = useState<number>(1);
    const { currentPage, Pagination } = usePagination();

    const fetchData = async () => {
        try {                            
            await handleCountTasks().then(count => {
                const total = (parseInt(count)/tasksPerPage)
                if ((parseInt(count)%tasksPerPage) > 0)
                    setTotalPages(Math.floor(total) + 1)                                 
                else
                    setTotalPages(total)                            
            });
            await handleMultiTask(minimumTasks, maxTasks, false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {  
        setMinimumTasks(((currentPage - 1) * tasksPerPage) + 1);
        setMaxTasks(currentPage * tasksPerPage);           
        fetchData();        
    }, [currentPage, totalPages, minimumTasks, maxTasks]);


    const maxReward = multiTasksData?.reduce((acc, curr) => {
        const parsedReward = Number.parseFloat(curr.reward)

        return parsedReward > acc ? parsedReward : acc
    }, 0) || 0

    const filteredMultiTasks = filterTasks(multiTasksData || [])

    return (
        <>
            <Helmet>
                <title>Web3Task</title>
            </Helmet>

            <Box
            >
                <CoverHomeTasks />
                <Box>
                    <Box height={40} bgcolor={'#8EFFC2'} />

                    <Grid container spacing={2} ml={15} style={{ width: '92%' }} >
                        <Grid item xs={2} mt={5}>
                            <SearchFilters maxReward={maxReward} />
                        </Grid>

                        <Grid item xs={10} style={{ width: '92%' }}>
                            <CardMultiTasks multiTasksData={filteredMultiTasks} loading={loading} page={currentPage} />
                        </Grid>
                    </Grid>
                </Box>

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={10}>
                    <Pagination numPages={totalPages} />
                </Box>

            </Box >

        </>
    )
}

export default HomeTasks