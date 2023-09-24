import { useEffect, useState, forwardRef } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { useTaskService } from "src/services/tasks-service";
import { Task, TaskStatus }  from "src/models/task";
import { account } from 'src/wagmi'
import SuspenseLoader from 'src/components/SuspenseLoader';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  },
);

let newTask :Task = {
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

const CreateTask = ({data}) => {
  const { createTask } = useTaskService();
  const [task, setTask] = useState<Task>();
  const [expireDate, setExpireDate] = useState<DatePickerProps<Dayjs> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleTitle = (event) => {
    task.title = event.target.value;
  };

  const handleDescription = (event) => {
    task.description = event.target.value;
  };

  const handleReward = (event) => {
    task.reward = event.target.value;
  };

  const handleTags = (event) => {
    // criar enum com as TAGS
    // procurar um componente no Material UI para ir incluindo tags
    //task.tags[0] = event.target.value;
  };

  const onSubmit = async(event: { preventDefault: () => void; }) => {    
    //guarda metadata no ipfs e realiza o mint
    try {
      console.log("expireDate: ", expireDate);
      
      task.endDate = BigInt(99999999);
      console.log("task: ", task);
      var response = await createTask(task);
      console.log("response: ", response);
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  useEffect(() => {
    if (loading && data != undefined){
      setTask(data);
      setLoading(false);
    }
    else {
      if (loading){
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
          <img src='/static/images/task/create-task-cover.png' alt='CreateTaskCover' width={'100%'} height={'100%'}/>

        </Box>
        {
          loading ? <SuspenseLoader /> : (
            <Box marginTop= {2} >
              <Stack spacing={2} alignItems={'center'} >
    
                {/* <Typography>Nome da Task</Typography> */}
                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.title ? '' : 'Nome da Task'}
                      onBlur={handleTitle}
                      placeholder={data && data.title ? '' : 'A title about the ativity.'}
                      disabled={data && data.tokenId >= 0 ? true : false}
                      value={data && data.title} />           
    
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
    
                
                <TextField
                  fullWidth
                  id="outlined-required"
                  label={data && data.title ? '' : 'Tags'}
                      onBlur={handleTags}
                      placeholder={data && data.tags ? '' : 'A tag about the ativity.'}
                      disabled={data && data.tokenId >= 0 ? true : false}
                      value={data && data.tags} />   
    
    
                <Stack spacing={2} direction={'row'}>
                  
                  <Box>
                    <Typography>NFT</Typography>
                    <img src='/static/images/logo/pod3labs-logo.png' width={'100px'} height={'100px'} alt='Pod3LabsRecompensaIcon'/>
                  </Box>  
                  <TextField //{...register("valueReward")}
                      label={data && data.reward ? '' : 'Recompensa ($)'}
                      value={data && data.reward ? Number(data.reward) : Number(newTask.reward)}
                      onBlur={handleReward}
                      disabled={data && data.tokenId >= 0 ? true : false}
                      InputProps={{
                        inputComponent: NumericFormatCustom as any,
                      }}
                    />
                  
                  <DatePicker
                    disabled={data && data.tokenId >= 0 ? true : false}
                    label={data && data.endDate ? '' : 'Data Entrega'}
                    value={data && data.endDate ? data.endDate : expireDate}
                    onChange={(newValue) => setExpireDate(newValue)}
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
