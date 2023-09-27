import { Box, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/content/applications/Tasks/hooks/useTaskServiceHook";
import { useEffect } from "react";
import CardTasks from "../CardTasks";
import CardMultiTasks from "../CardMultiTasks";

const HomeTask = () => {

    const taskService = useTaskService();

    // Instância do hook useTaskServiceHook
    const { handleTask, handleMultiTask, taskData, multiTasksData, loading, error } = useTaskServiceHook(taskService);

    useEffect(() => {
        const fetchData = async () => {
            // Chama as operações assíncronas ao montar o componente
            await handleTask(1);
            await handleMultiTask(0, 2);
        };

        fetchData();
    }, []); // Dependência vazia significa que isso será executado apenas uma vez no montar do componente

    useEffect(() => {
        if (taskData && multiTasksData && !loading) {
            console.log('taskData', taskData);
            console.log('multiTasksData', multiTasksData);
        } else {
            console.error(error);
        }
    }, []);

    return (
        <>
            <Box>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={"row"} >

                    <Box>
                        <img
                            src="/static/images/task/home/quebra-cabeca.svg"
                            alt="Quebra Cabeca"
                            width={200}
                            height={150}
                        />
                    </Box>

                    <Box>
                        <Box>
                            <Typography color={'green'} fontSize={50}>
                                WEB3 TASK
                            </Typography>
                        </Box>
                        <Box>
                            <img
                                src="/static/images/task/home/detail.svg"
                                alt="4 Pontos Interligados"
                                width={75}
                            />
                        </Box>
                    </Box>

                    <Box>
                        <img
                            src="/static/images/task/home/star1.svg"
                            alt="Estrela"
                            width={50}
                            height={50}

                        />
                        <img
                            src="/static/images/task/home/star2.svg"
                            alt="Estrela"
                            width={50}
                            height={50}

                        />

                    </Box>

                </Box>
                <Box>
                    <Box height={40} bgcolor={'#8EFFC2'} />
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'}>
                        <TuneIcon /> Filtro
                        <Box>
                            <CardTasks taskData={taskData} loading={loading} />
                            <CardMultiTasks multiTasksData={multiTasksData} loading={loading} />
                        </Box>
                    </Box >
                </Box>
            </Box >


        </>
    )
}

export default HomeTask