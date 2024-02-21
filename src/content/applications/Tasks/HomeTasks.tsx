import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import CardMultiTasks from "../../../components/Task/CardMultiTasks";
import usePagination from "src/components/Pagination";
import SearchFilters from "src/components/Task/SearchFiltersTasks";
import { useSearchFilters } from "src/hooks/useSearchFilters";
import { Helmet } from "react-helmet-async";

const HomeTasks = () => {
    const taskService = useTaskService();
    const { handleCountTasks, handleMultiTask, multiTasksData, loading } = useTaskServiceHook(taskService);
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { filter: filterTasks } = useSearchFilters();
    const [tasksPerPage, setTasksPerPage] = useState<number>(20);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [maxTasks, setMaxTasks] = useState<number>(20);
    const [minimumTasks, setMinimumTasks] = useState<number>(1);
    const { currentPage, Pagination } = usePagination();

    const fetchData = async () => {
        try {
            await handleCountTasks().then(count => {
                const total = (parseInt(count) / tasksPerPage)
                if ((parseInt(count) % tasksPerPage) > 0)
                    setTotalPages(Math.floor(total) + 1)
                else
                    setTotalPages(total)
            });
            await handleMultiTask(minimumTasks, maxTasks, false);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const maxReward = multiTasksData?.reduce((acc, curr) => {
        const parsedReward = Number.parseFloat(curr.reward)

        return parsedReward > acc ? parsedReward : acc
    }, 0) || 0

    const filteredMultiTasks = filterTasks(multiTasksData || [])

    useEffect(() => {
        setMinimumTasks(((currentPage - 1) * tasksPerPage) + 1);
        setMaxTasks(currentPage * tasksPerPage);
        fetchData();
    }, [currentPage, totalPages, minimumTasks, maxTasks]);

    return (
        <>
            <Helmet>
                <title>Web3Task</title>
            </Helmet>

            <Box>
                <Box>
                    <Grid display={'flex'} spacing={1} ml={mdDown ? -3 : 15} style={{ width: '92%' }} >
                        <Grid item xs={mdDown ? 4 : 2} ml={smDown && 1.5} mt={5} display={'flex'}>
                            <SearchFilters maxReward={maxReward} />
                        </Grid>

                        <Grid item xs={mdDown ? 8 : 10} ml={smDown && -2} mt={smDown && -2} style={{ width: '92%' }}>
                            <CardMultiTasks multiTasksData={filteredMultiTasks} loading={loading} page={currentPage} />
                        </Grid>
                    </Grid>
                </Box>

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={10}>
                    <Pagination numPages={totalPages} />
                </Box>
            </Box>
        </>
    )
}

export default HomeTasks