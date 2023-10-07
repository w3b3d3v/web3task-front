import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Slider, TextField, Typography, useTheme } from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import CardMultiTasks from "../CardMultiTasks";
import CoverTasks from "../CoverTasks";
import usePagination from "src/components/Pagination";

const HomeTask = () => {
    const [title, setTitle] = useState("")
    const [creatorRole, setCreatorRole] = useState("")
    const [reward, setReward] = useState(0)
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)

    const theme = useTheme();
    const taskService = useTaskService();

    const { handleMultiTask, multiTasksData, loading, error } = useTaskServiceHook(taskService);

    const tasksPerPage = 20;
    const { currentPage, Pagination, setPage } = usePagination();

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

    const filteredMultiTasks = multiTasksData?.filter((task) => {
        if (title && !task.title.toLowerCase().includes(title.toLowerCase())) {
            return false
        }

        if (creatorRole && !task.creatorRole.toLowerCase().includes(creatorRole.toLowerCase())) {
            return false
        }

        if (reward > 0 && (reward >= Number.parseFloat(task.reward))) {
            return false
        }

        if (dueDate && dueDate.startOf('day').isBefore(dayjs.unix(task.endDate).startOf('day'))) {
            return false
        }

        return true
    })

    const maxReward = multiTasksData?.reduce((acc, curr) => {
        const parsedReward = Number.parseFloat(curr.reward)

        return parsedReward > acc ? parsedReward : acc

    }, 0) || 0

    return (
        <>

            <Box
                sx={{ width: '100%' }}>

                <CoverTasks />

                <Box>
                    <Box height={40} bgcolor={'#8EFFC2'} />


                    <Grid container spacing={2} marginTop={0} style={{ width: '100%', overflowX: 'hidden' }} >
                        <Grid item xs={3} bgcolor={theme.palette.mode === 'dark' ? theme.colors.alpha.black[100] : theme.colors.alpha.trueWhite[100]}>
                            <Box display="inline-flex" alignItems="center">
                                <img
                                    src="/static/images/task/home/filtroIcon.svg"
                                    alt="Filtro"
                                />

                                <Typography fontSize={20}>
                                    Filtro
                                </Typography>
                            </Box>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreTwoToneIcon sx={{
                                        color: theme.palette.mode === 'dark' ? 'white' : 'black'
                                    }} />}
                                >
                                    <Typography>Título</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <TextField
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        label="Pesquisar por título"
                                        variant="standard"
                                        fullWidth
                                    />
                                </AccordionDetails>
                            </Accordion>


                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreTwoToneIcon sx={{
                                        color: theme.palette.mode === 'dark' ? 'white' : 'black'
                                    }} />}
                                >
                                    <Typography>Criador</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <TextField
                                        value={creatorRole}
                                        onChange={(e) => setCreatorRole(e.target.value)}
                                        label="Pesquisar por criador"
                                        variant="standard"
                                        fullWidth
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreTwoToneIcon sx={{
                                        color: theme.palette.mode === 'dark' ? 'white' : 'black'
                                    }} />}
                                >
                                    <Typography>Pagamento por hora</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Slider
                                        valueLabelDisplay="auto"
                                        value={reward}
                                        onChange={(_, value) => setReward(value as number)}
                                        min={0}
                                        max={maxReward}
                                    />
                                </AccordionDetails>
                            </Accordion>

                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreTwoToneIcon sx={{
                                        color: theme.palette.mode === 'dark' ? 'white' : 'black'
                                    }} />}
                                >
                                    <Typography>Data de vencimento</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <DatePicker
                                        label="Data de vencimento"
                                        value={dueDate}
                                        onChange={setDueDate}
                                        format="DD/MM/YYYY"
                                    />
                                </AccordionDetails>
                            </Accordion>
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

export default HomeTask