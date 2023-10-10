import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import CardMultiTasks from "../../../components/Task/CardMultiTasks";
import CoverHomeTasks from "../../../components/Cover/CoverHomeTasks";
import usePagination from "src/components/Pagination";
import SearchFilters from "src/components/SearchFilters";
import { useSearchFilters } from "src/hooks/useSearchFilters";

const HomeTasks = () => {
    const taskService = useTaskService();

    const { handleMultiTask, multiTasksData, loading } = useTaskServiceHook(taskService);
    const theme = useTheme();
    const { filter: filterTasks } = useSearchFilters();
    const tasksPerPage = 20;
    const { currentPage, Pagination } = usePagination();

    useEffect(() => {
        const minimumTasks = (currentPage - 1) * tasksPerPage + 1;
        const maxTasks = currentPage * tasksPerPage;

        const fetchData = async () => {
            try {
                await handleMultiTask(minimumTasks, maxTasks, false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, [currentPage]);


    useEffect(() => {
        if (multiTasksData && !loading) {
            console.log('multiTasksData', multiTasksData);
        }
    }, []);

    const maxReward = multiTasksData?.reduce((acc, curr) => {
        const parsedReward = Number.parseFloat(curr.reward)

        return parsedReward > acc ? parsedReward : acc

    }, 0) || 0

    const filteredMultiTasks = filterTasks(multiTasksData || [])

    return (
        <>

            <Box
                sx={{ width: '100%' }}>

                <CoverHomeTasks />

                <Box>
                    <Box height={40} bgcolor={'#8EFFC2'} />


                    <Grid container spacing={2} marginTop={0} style={{ width: '100%', overflowX: 'hidden' }} >
                        <Grid item xs={3} bgcolor={theme.palette.mode === 'dark' ? theme.colors.alpha.black[100] : theme.colors.alpha.trueWhite[100]}>
                            <SearchFilters maxReward={maxReward} />
                        </Grid>

                        <Grid item xs={9} style={{ maxWidth: '100%' }}>

                            <CardMultiTasks multiTasksData={filteredMultiTasks} loading={loading} page={currentPage} />
                        </Grid>
                    </Grid>
                </Box>

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={10}>

                    <Pagination />

                </Box>

            </Box >

        </>
    )
}

export default HomeTasks