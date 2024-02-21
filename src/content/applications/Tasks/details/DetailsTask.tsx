import { useParams } from "react-router-dom"
import { Box, Card, CardContent, Container, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import CardTasks from "../../../../components/Task/CardTask";

const DetailsTask = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const taskService = useTaskService();
    const { taskId } = useParams();
    const { handleTask, handleReview, taskData, taskReview, loading, error } = useTaskServiceHook(taskService);

    const fetchData = async () => {
        await handleTask(Number(taskId));
        await handleReview(Number(taskId));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Web3Task - Task Details</title>
            </Helmet>

            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '40px'
            }}>
                <Box sx={{ width: 709, height: '100%', mt: 6 }} >
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >
                        {
                            loading ? <SuspenseLoader />
                                :
                                (
                                    <>
                                        <Box width={smDown ? '100%' : 709} mt={smDown ? 2 : 0}>
                                            <CardTasks taskId={taskId} taskData={taskData} loading={loading} />

                                            <Box mt={4} width={smDown ? '100%' : 679} display={'flex'} flexDirection={smDown ? 'column' : 'row'} justifyContent={smDown ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: smDown ? '100%' : 192, height: 119, justifyContent: 'center', marginBottom: smDown ? '16px' : '0', ml: smDown ? 10 : 0 }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={'center'}>
                                                            Status
                                                        </Typography>
                                                        <Divider variant="fullWidth" />
                                                        <Typography variant="h6" textAlign={'center'} mt={1}>
                                                            {taskData ? taskData.status : 'Created'}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>

                                                <Card sx={{ width: smDown ? '100%' : 434, height: 119, justifyContent: smDown ? 'center' : 'left', ml: smDown ? 10 : 0 }}>
                                                    <CardContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Reviews
                                                        </Typography>
                                                        <Divider />
                                                        <Box
                                                            component="div"
                                                            sx={{
                                                                whiteSpace: 'nowrap',
                                                                mb: 7.5,
                                                                p: 1,
                                                                bgcolor: (theme) =>
                                                                    theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
                                                                color: (theme) =>
                                                                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                                                fontSize: '0.875rem',
                                                                fontWeight: '700',
                                                            }}
                                                        >
                                                            <Typography variant="h6" textAlign={'left'} mt={1} height={119} component="div">
                                                                {taskReview ? (taskReview.map((review: any, index: React.Key) => {
                                                                    return (

                                                                        <Typography variant="h6" textAlign={'left'} key={'review' + index} mt={1} component="div">
                                                                            {review}
                                                                        </Typography>

                                                                    )
                                                                })) : 'No reviews provided for this task.'}
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Box>

                                            <Box mt={4} width={smDown ? '100%' : 679} display={'flex'} flexDirection={smDown ? 'column' : 'row'} justifyContent={smDown ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: '100%', height: 200, justifyContent: smDown ? 'center' : 'left', ml: smDown ? 10 : 0 }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Description
                                                        </Typography>
                                                        <Divider />
                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div">
                                                            {taskData ? taskData.description : 'No description provided for this task.'}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Box>

                                    </>
                                )
                        }
                    </Box>
                </Box >
            </Container>
        </>
    )
}

export default DetailsTask