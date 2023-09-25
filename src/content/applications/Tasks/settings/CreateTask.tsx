import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useTaskService } from "src/services/tasks-service";
import { Task, TaskStatus } from "src/models/task";
import SuspenseLoader from 'src/components/SuspenseLoader';
import { Buffer } from 'buffer';
import { account } from 'src/wagmi';

/*
  let newTask: Task = {
    status: TaskStatus.New,
    title: Buffer.from(''),
    description: Buffer.from(''),
    reward: Buffer.from(''),
    endDate: Buffer.from(''),
    authorizedRoles: [Buffer.from('')],
    creatorRole: Buffer.from(''),
    assignee: Buffer.from(''),
    metadata: Buffer.from('')
  }
 */

let newTask: Task = {
  status: 0,
  title: '',
  description: '',
  reward: BigInt(''),
  endDate: BigInt(''),
  authorizedRoles: [BigInt('')],
  creatorRole: BigInt(''),
  assignee: account,
  metadata: ''
}

const CreateTask = ({ data }) => {
  const { createTask } = useTaskService();
  const [task, setTask] = useState<Task>();
  const [expireDate, setExpireDate] = useState<DatePickerProps<Dayjs> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleTitle = (event: { target: { value: any; }; }) => {
    task.title = (event.target.value).toString();
  };

  const handleAuthorizedRoles = (event: any) => {

    let authorizedRoles: string[] = (event.target.value).split(',');
    const bufferFrom: readonly bigint[] = authorizedRoles.map(str => BigInt(str));
    task.authorizedRoles = bufferFrom;
  };

  const handleCreatorRole = (event: { target: { value: any; }; }) => {
    task.creatorRole = event.target.value;
  };

  const handleAssignee = (event: { target: { value: any; }; }) => {
    task.assignee = event.target.value;
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
    console.log("task.reward: ", task.reward);
  };

  const onSubmit = async (event: { preventDefault: () => void; }) => {
    //guarda metadata no ipfs e realiza o mint
    try {
      console.log("expireDate: ", expireDate);


      let data = String(Math.floor(Date.now() / 1000) + 3600)
      task.endDate = BigInt(data);
      console.log("task: ", task);
      const response: any = await createTask(task);
      console.log("responseOnSubmit: ", response);
    } catch (error) {
      console.log("Erro: ", error);
    }
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
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100%'}
        flexDirection={'column'}>

        <Box
          width={'100%'}>
          <img src='/static/images/task/create-task-cover.png' alt='CreateTaskCover' width={'100%'} height={'100%'} />

        </Box>
        {
          loading ? <SuspenseLoader /> : (
            <Box marginTop={2} >
              <Stack spacing={2} alignItems={'center'} >

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.title ? '' : 'Task Title'}
                  onBlur={handleTitle}
                  placeholder={data && data.title ? '' : 'A title about the ativity.'}
                  disabled={data && data.tokenId >= 0 ? true : false}
                  value={data && data.title} />

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.authorizedRoles ? '' : 'Authorized Role (separate as in array e.g.: [A,B,C,D]'}
                  onBlur={handleAuthorizedRoles}
                  placeholder={data && data.authorizedRoles ? '' : 'authorizedRoles'}
                  disabled={data && data.tokenId >= 0 ? true : false}
                  value={data && data.authorizedRoles} />

                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.creatorRole ? '' : 'Creator Role'}
                  onBlur={handleCreatorRole}
                  placeholder={data && data.creatorRole ? '' : 'creatorRole'}
                  disabled={data && data.tokenId >= 0 ? true : false}
                  value={data && data.creatorRole} />


                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.assignee ? '' : 'Assignee (leave blank for anyone to fetch)'}
                  onBlur={handleAssignee}
                  placeholder={data && data.assignee ? '' : 'assignee.'}
                  disabled={data && data.tokenId >= 0 ? true : false}
                  value={data && data.assignee} />


                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.metadata ? '' : 'Metadata IPFS'}
                  onBlur={handleMetadata}
                  placeholder={data && data.metadata ? '' : 'metadata'}
                  disabled={data && data.tokenId >= 0 ? true : false}
                  value={data && data.metadata} />

                <TextField fullWidth //{...register("description")}                
                  id="outlined-required"
                  label={data && data.description ? '' : 'Descrição da tarefa'}
                  onBlur={handleDescription}
                  placeholder={data && data.description ? '' : 'A full description about the ativity.'}
                  multiline
                  rows="6"
                  disabled={data && data.tokenId >= 0 ? true : false}
                  maxRows="18"
                  value={data && data.description}
                />

                {/* <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.title ? '' : 'Tags'}
                  onBlur={handleTags}
                  placeholder={data && data.tags ? '' : 'A tag about the ativity.'}
                  disabled={data && data.tokenId >= 0 ? true : false}
                  value={data && data.tags} /> */}


                <Stack spacing={2} direction={'row'}>

                  <Box>
                    <Typography>NFT</Typography>
                    <img src='/static/images/logo/pod3labs-logo.png' width={'100px'} height={'100px'} alt='Pod3LabsRecompensaIcon' />
                  </Box>
                  <TextField //{...register("valueReward")}
                    label={data && data.reward ? '' : ''}
                    value={data && data.reward ? Number(data.reward) : Number(newTask.reward)}
                    onBlur={handleReward}
                    disabled={data && data.tokenId >= 0 ? true : false}
                  />

                  <DatePicker
                    disabled={data && data.tokenId >= 0 ? true : false}
                    label={data && data.endDate ? '' : 'Data Entrega'}
                    value={data && data.endDate ? data.endDate : expireDate}
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
    </>

  );
}

export default CreateTask
