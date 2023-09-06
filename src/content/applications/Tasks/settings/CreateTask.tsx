import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateTask = () => {

  const [initialDate, setInitialDate] = useState();
  const [finalDate, setFinalDate] = useState();

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
              required
              label='Nome da Task' />

            {/* <Typography>Cargo</Typography> */}
            <TextField
              fullWidth
              required
              label='Cargo' />

            {/* <Typography>Nome da empresa?*</Typography> */}
            <TextField
              fullWidth
              required
              label='Nome da empresa?' />

            {/* <Typography>Descrição da tarefa?*</Typography> */}
            <TextField
              fullWidth
              required
              label='Descrição da tarefa?' />

            {/* <Typography>Tag?*</Typography> */}
            <TextField
              fullWidth
              required
              label='Tag' />

            {/* <Typography>Detalhes da empresa:*</Typography> */}
            <TextField
              fullWidth
              required
              label='Detalhes da empresa:' />

            <Stack spacing={2} direction={'row'}>
              <Box>
                <Typography>Recompensa</Typography>
                <img src='/static/images/logo/pod3labs-logo.png' width={'100px'} height={'100px'} alt='Pod3LabsRecompensaIcon'/>
                <TextField
                  required
                  label='Descrição da NFT' />

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
                required
                label='Valor' />

            </Stack>

            <Button variant='contained' color='primary'>
              Enviar
            </Button>
            
          </Stack>
        </Box>
      </Box>
    </>

  );
}

export default CreateTask
