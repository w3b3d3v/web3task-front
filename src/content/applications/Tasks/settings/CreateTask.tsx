import { useEffect, useState, forwardRef } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Box, useTheme } from '@mui/material';
import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useTaskService } from "src/services/tasks-service";
import { Task, TaskStatus } from "src/models/task";
import SuspenseLoader from 'src/components/SuspenseLoader';
import CoverCreateTask from './CoverCreateTask';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let newTask: Task = {
  status: 0,
  title: '',
  description: '',
  reward: BigInt(''),
  endDate: BigInt(''),
  authorizedRoles: [BigInt('')],
  creatorRole: BigInt(''),
  assignee: "0x0000000000000000000000000000000000000000",
  metadata: ''
}

const CreateTask = ({ data }) => {
  const theme = useTheme();
  const { createTask } = useTaskService();
  const [task, setTask] = useState<Task>();
  const [expireDate, setExpireDate] = useState<DatePickerProps<Dayjs> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openInformartion, setOpenInformartion] = useState(false);
  const [openError, setOpenError] = useState(false);

  const logoImage = "/static/images/logo/logo-footer-" + theme.palette.mode + ".svg";

  const handleChange = (event: { target: { value: any; }; }) => {
    task.description = event.target.value;
  }

  const handleTitle = (event: { target: { value: any; }; }) => {
    task.title = (event.target.value).toString();
  };

  const handleAuthorizedRoles = (event: any) => {

    let authorizedRoles: string[] = (event.target.value).split(',');
    const splittedRoles: readonly bigint[] = authorizedRoles.map(str => BigInt(str));
    task.authorizedRoles = splittedRoles;
  };

  const handleCreatorRole = (event: { target: { value: any; }; }) => {
    task.creatorRole = event.target.value;
  };

  const handleAssignee = (event: { target: { value: any; }; }) => {
    task.assignee = event.target.value == '' ? "0x0000000000000000000000000000000000000000" : event.target.value;
  };

  const handleMetadata = (event: { target: { value: any; }; }) => {
    task.metadata = event.target.value;
  };

  const handleDescription = (event: { target: { value: any; }; }) => {
    task.description = event.target.value;
  };

  const handleReward = (event: { target: { value: any; }; }) => {
    let reward = event.target.value;
    task.reward = BigInt(reward);
  };

  const onSubmit = async (event: { preventDefault: () => void; }) => {
    try {
      console.log("Expire date", (expireDate))
      let data = String(Math.floor(Date.now() / 1000) + 3600)
      task.endDate = BigInt(data);
      console.log("task.endDate: ", task.endDate);

      await createTask(task);

      setOpenInformartion(true);
    } catch (error) {
      console.log("Erro: ", error);
      setOpenError(true);
    }
  };

  const handleCloseSnackInformation = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenInformartion(false);
  };

  const handleCloseSnackError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  useEffect(() => {
    if (loading && data != undefined) {
      setTask(data);
      console.log('data = ', data);
      setLoading(false);
    }
    else {
      if (loading) {
        setTask(newTask)
        setLoading(false);
      }
    }
  }, [setLoading]);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openInformartion} autoHideDuration={6000} onClose={handleCloseSnackInformation}>
        <Alert onClose={handleCloseSnackInformation} severity="info" sx={{ width: '100%' }}>
          Task creation initiated with sucess!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnackError}>
        <Alert onClose={handleCloseSnackError} severity="error" sx={{ width: '100%' }}>
          Task not created! Try again!
        </Alert>
      </Snackbar>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100%'}
        flexDirection={'column'}>

        <Box
          width={'100%'}>
          <CoverCreateTask />
        </Box>
        {
          loading ? <SuspenseLoader /> : (
            <Box marginTop={2} >
              <Stack spacing={2} alignItems={'center'} >

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={'Title'}
                  onBlur={handleTitle}
                  placeholder={'Describe the activity or link to a document'}
                />

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={'Authorized Roles (separate by `,`)'}
                  onBlur={handleAuthorizedRoles}
                  placeholder={'The authorized roles to perform the task'}
                />

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={'Creator Role'}
                  onBlur={handleCreatorRole}
                  placeholder={'0xABCD...01234'}
                />

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={'Assignee Address (leave blank to allow anyone to perform the task)'}
                  onBlur={handleAssignee}
                  placeholder={'Assignee address'}
                />

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={'Metadata (IPFS)'}
                  onBlur={handleMetadata}
                  placeholder={'https://ipfs.io/ipfs/QmY5D...7CEh'}
                />

                <TextField fullWidth //{...register("description")}                
                  id="outlined-required"
                  label={'Description'}
                  onBlur={handleDescription}
                  placeholder={'A full description about the ativity.'}
                  multiline
                  maxRows="18"
                  onChange={handleChange}
                />

                <Stack spacing={2} direction={'row'} alignItems="center" justifyContent="center">
                  <Box>
                    <img src={logoImage} width={'100px'} height={'100px'} alt='Pod3LabsRecompensaIcon' />
                  </Box>
                  <TextField
                    label={'Reward in USD'}
                    onBlur={handleReward}
                  />
                  <DatePicker
                    label={'Deliver Date'}
                    onChange={(newValue: any) => setExpireDate(newValue)}
                  />
                </Stack>

                <Button onClick={onSubmit} variant='contained' color='primary'>
                  Enviar
                </Button>

              </Stack>
            </Box>
          )
        }
      </Box>
    </Stack>

  );
}

export default CreateTask
