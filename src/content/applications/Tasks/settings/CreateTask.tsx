import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTaskService } from "src/services/tasks-service";
import { Task, TaskStatus }  from "src/models/task";
import { account } from 'src/wagmi'

const CreateTask = ({data}) => {
  const { createTask } = useTaskService();
  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();
  const [task, setTask] = useState<Task>();

  const prepareNewTask = () : Task => {
    var newTask = {
      status: TaskStatus.New,
      title: '',
      description: '',
      reward: BigInt(0),
      endDate: BigInt(0),
      authorized: [ ],
      creator: BigInt(0),
      assignee: account,
      metadata: ''
    }
    return newTask;
  } 

  const handleChangeDescription = (event) => {
    console.log("task", task)
    task.description = event.target.value;
  };

  const onSubmit = async(event: { preventDefault: () => void; }) => {    
    //guarda metadata no ipfs e realiza o mint
    try {
      
      var response = await createTask(task);
      console.log("response: ", response);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  useEffect(() => {
    if (data != undefined){
      setTask(data);
    }
    else {
      setTask(prepareNewTask())    
    }
  },[]);

  return (
    <>
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      flexDirection={'column'}>

      <Box
        width={'100%'}>
        <img src='/static/images/task/create-task-cover.png' alt='CreateTaskCover' width={'100%'} height={'100%'}/>

      </Box>
        <Box marginTop= {2} >
          <Stack spacing={2} alignItems={'center'} >

            {/* <Typography>Nome da Task</Typography> */}
            <TextField
              fullWidth
              
              label='Nome da Task' />

            {/* <Typography>Cargo</Typography> */}
            <TextField
              fullWidth
              
              label='Cargo' />

            {/* <Typography>Nome da empresa?*</Typography> */}
            <TextField
              fullWidth
              
              label='Nome da empresa?' />

            {/* <Typography>Descrição da tarefa?*</Typography> */}
            <TextField
              fullWidth
              
              label='Descrição da tarefa?' />

            {/* <Typography>Tag?*</Typography> */}
            <TextField
              fullWidth
              
              label='Tag' />

            {/* <Typography>Detalhes da empresa:*</Typography> */}
            <TextField
              fullWidth
              
              label='Detalhes da empresa:' />

            <Stack spacing={2} direction={'row'}>
              <Box>
                <Typography>Recompensa</Typography>
                <img src='/static/images/logo/pod3labs-logo.png' width={'100px'} height={'100px'} alt='Pod3LabsRecompensaIcon'/>
                <TextField fullWidth //{...register("description")}                
                  id="outlined-required"
                  label={data && data.description ? '' : 'Descrição da NFT'}
                  onChange={handleChangeDescription}
                  placeholder={data && data.description ? '' : 'A full description about the ativity.'}
                  multiline
                  rows="6"
                  disabled={data && data.tokenId >= 0 ? true : false}
                  maxRows="18"
                  value={data && data.description}
                />

              </Box>

            </Stack>

            <Stack spacing={2} display={'flex'} direction={'row'}>

              <DatePicker
                label="Data Inicial"
                value={initialDate}
              />

              <DatePicker
                label="Data Entrega"
                value={finalDate}
              />

              <TextField
                
                label='Valor' />

            </Stack>

            <Button onClick={onSubmit} variant='contained' color='primary'>
              Enviar
            </Button>
            
          </Stack>
        </Box>
      </Box>
    </>

  );
}

export default CreateTask
