import { useParams } from "react-router-dom"
import { Box, Card, CardContent, Container, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect } from "react";
import CardTasks from "../tasks/CardTasks";

const DetailsTask = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const taskService = useTaskService();
    const { taskId } = useParams();

    const { handleTask, taskData, loading, error } = useTaskServiceHook(taskService);

    useEffect(() => {
        const fetchData = async () => {
            await handleTask(Number(taskId));
        };

        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Web3Task - Profile</title>
            </Helmet>

            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{ width: 709, height: '100%', mt: 6 }} >

                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >

                        {
                            loading ? <SuspenseLoader />
                                :
                                (
                                    <>
                                        <Box width={isSmallScreen ? '100%' : 709} mt={isSmallScreen ? 2 : 0}>
                                            <CardTasks taskId={taskId} taskData={taskData} loading={loading} />

                                            <Box mt={4} width={isSmallScreen ? '100%' : 679} display={'flex'} flexDirection={isSmallScreen ? 'column' : 'row'} justifyContent={isSmallScreen ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: isSmallScreen ? '100%' : 192, height: 119, justifyContent: 'center', marginBottom: isSmallScreen ? '16px' : '0' }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={'center'}>
                                                            Task Status
                                                        </Typography>
                                                        <Divider variant="fullWidth" />
                                                        <Typography variant="h6" textAlign={'center'} mt={1}>
                                                            {taskData ? taskData.status : 'Created'}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>


                                                <Card sx={{ width: isSmallScreen ? '100%' : 434, height: 119, justifyContent: isSmallScreen ? 'center' : 'left' }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Task Reviews
                                                        </Typography>
                                                        <Divider />
                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div">
                                                            https://link1.com.br
                                                        </Typography>
                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div">
                                                            https://link2.com.br
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Box>

                                    </>
                                )
                        }
                    </Box >

                </Box>
            </Container>

        </>
    )
}

export default DetailsTask