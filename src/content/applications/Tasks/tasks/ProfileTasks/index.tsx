import { Grid, Container, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/content/applications/Tasks/hooks/useTaskServiceHook";
import { useEffect } from "react";
import CardTasks from "../CardTasks";
import CardMultiTasks from "../CardMultiTasks";
import { useAccount } from 'wagmi';

const HomeTask = () => {
    const { data: accountData } = useAccount();
    const taskService = useTaskService();

    // Instância do hook useTaskServiceHook
    const { handleMultiTask, handleMultiUserTasks, multiTasksData, loading, error } = useTaskServiceHook(taskService);

    // const fetchData = async () => {
    //     // Chama as operações assíncronas ao montar o componente
    //     //await handleMultiUserTasks(accountData?.address);
    //     await handleMultiTask(0,10);
    // };

    useEffect(() => {
        const fetchData = async () => {
            // Chama as operações assíncronas ao montar o componente
            //await handleTask(1);
            await handleMultiTask(0, 10);
        };

        fetchData();
    }, []); // Dependência vazia significa que isso será executado apenas uma vez no montar do componente

    // useEffect(() => {
    //     if (taskData && multiTasksData && !loading) {
    //         console.log('taskData', taskData);
    //         console.log('multiTasksData', multiTasksData);
    //     } else {
    //         console.error(error);
    //     }
    // }, []);

    return (
        <>
            <Helmet>
                <title>Web3Task - Profile</title>
            </Helmet>
            <Container maxWidth="lg">
                <Grid display={'flex'} justifyContent={'center'}>
                    <img
                        src="/static/images/task/profile/profile-banner.svg" width={'100%'} height={'500px'}
                    />
                </Grid>
                <Grid justifyContent={'center'} alignItems={'center'} height={'max-content'} item xs={12}>
                    <Grid display={'flex'} item xs={3}>
                        <TuneIcon /> Filtro
                        <Typography>Title</Typography>
                        <Typography>Role</Typography>
                        <Typography>Reward</Typography>
                        <Typography>Due Data</Typography>

                    </Grid>
                    {
                        
                        loading ? <SuspenseLoader />
                        :
                        (
                            <Grid display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} xs={9}>
                                <CardMultiTasks multiTasksData={multiTasksData} loading={loading} />     
                            </Grid>                        
                        )
                    }
                </Grid>
                               
            </Container>

        </>
    )
}

export default HomeTask