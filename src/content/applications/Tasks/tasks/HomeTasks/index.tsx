import { Box, Grid, Typography } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/content/applications/Tasks/hooks/useTaskServiceHook";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Slider, TextField, Typography, useTheme } from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import CardTasks from "../CardTasks";
import CardMultiTasks from "../CardMultiTasks";

const HomeTask = () => {
    const [title, setTitle] = useState("")
    const [creatorRole, setCreatorRole] = useState("")
    const [reward, setReward] = useState(0)
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)

    const theme = useTheme();
    const taskService = useTaskService();

    // Instância do hook useTaskServiceHook
    const { handleTask, handleMultiTask, taskData, multiTasksData, loading, error } = useTaskServiceHook(taskService);

    useEffect(() => {
        const fetchData = async () => {
            // Chama as operações assíncronas ao montar o componente
            await handleTask(1);
            await handleMultiTask(0, 10);
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


                    <Grid container spacing={2} marginTop={0}>
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

                        <Grid item xs={9}>
                          <CardMultiTasks multiTasksData={filteredMultiTasks} loading={loading} />
                        </Grid>
                    </Grid>
                </Box>

            </Box >





        </>
    )
}

export default HomeTask