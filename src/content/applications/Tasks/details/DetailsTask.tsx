import { useState }  from "react";
import {useParams} from "react-router-dom"
import { Grid, Box, Container, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/content/applications/Tasks/hooks/useTaskServiceHook";
import { useEffect } from "react";
import CardTasks from "../tasks/CardTasks";

const DetailsTask = () => {
    const taskService = useTaskService();
    const { taskId } = useParams();

    // Instância do hook useTaskServiceHook
    const { handleTask, taskData, loading, error } = useTaskServiceHook(taskService);    
    
    useEffect(() => {
        const fetchData = async () => {
            await handleTask(Number(taskId));
        };

        fetchData();
    }, []); // Dependência vazia significa que isso será executado apenas uma vez no montar do componente

    return (
        <>
            <Helmet>
                <title>Web3Task - Profile</title>
            </Helmet>
            <Container maxWidth="lg">
                <Box display={'flex'} justifyContent={'center'} bgcolor={"red"} width={'max-content'} >
{/*                     
                    <img
                        src="/static/images/task/task-details/background.svg" width={'100%'}
                    /> */}
                    
                </Box>
                <Box>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >
                        <Box>

                        </Box>
                        {
                            loading ? <SuspenseLoader />
                            :
                            (
                                <Box mt={'50px'} flex={1}>
                                    <CardTasks taskId={taskId} taskData={taskData} loading={loading} />
                                </Box>      
                            )
                        }
                    </Box >
                </Box>
                               
            </Container>

        </>
    )
}

export default DetailsTask