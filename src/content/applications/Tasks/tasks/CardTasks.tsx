import { useState, forwardRef, useEffect } from 'react';
import { Box, Button, Grid, CardMedia, CardContent, Typography, Card } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'
import { styled } from '@mui/material/styles';
import AccessTime from '@mui/icons-material/AccessTime';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import Start from '@mui/icons-material/Start';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useTaskService } from "src/services/tasks-service";
import { useWeb3Utils } from 'src/hooks/Web3Utils';
/**
 * CardTasks Component
 *
 * A component that displays a card for an NFT representing a task.
 *
 * @component
 * @param taskData - An array of TaskFront objects representing task data obtained from the Solidity contract function getTask().
 * @param loading - A boolean indicating whether the data is still loading.
 * @returns Card NFT to display
 */

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const CardCover = styled(Card)(
    ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(48)};
      }
  `
  );
  
  const CardCoverAction = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
  `
  );

export const CardTasks = ({taskId, taskData, loading }: any) => {
    const { startTask, reviewTask, completeTask, cancelTask, hasMemberRole, hasLeaderRole } = useTaskService();
    const [ openInformartion, setOpenInformartion ] = useState(false);
    const [ openError, setOpenError ] = useState(false);
    const [ error, setError ] = useState<string>();
    const [ action, setAction ] = useState<string>();
    const { userAddress } = useWeb3Utils();
    const [ isMember, setIsMember ] = useState<boolean>(false);
    const [ isLeader, setIsLeader ] = useState<boolean>(false);

    const getAction = (status: string) => {
        switch (status) {
            case "Created":
                setAction("Start Task")
                break;
            case "In Progress":
                setAction("Review Task")
                break;
            case "In Review":
                setAction("Complete Task")
                break;
            default:
                break;
        }
    }

    const handleAction = async () => {
        try {
            switch (taskData.status) {
                case "Created":
                    await startTask(BigInt(taskId));
                    break;
                case "In Progress":
                    await reviewTask(BigInt(taskId));
                    break;
                case "In Review":
                    await completeTask(BigInt(taskId));
                    break;
                default:
                    break;
            }
            
            setOpenInformartion(true);
        } catch (error) {
            setError(error.message)
            setOpenError(true);
        }
    };

    const handleCancel = async () => {
        try {
            await cancelTask(BigInt(taskId));
        } catch (error) {
            setError(error.message)
            setOpenError(true);
        }
    }

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

    useEffect(() =>{
        console.log("taskData", taskData)
        if(taskData != null){
            getAction(taskData.status);
            hasLeaderRole(userAddress()).then(result => {
                setIsLeader(result);
                hasMemberRole(userAddress()).then(result => {
                    setIsMember(result);
                })                
            })            
        }
    }, [])

    return (
              
            
                <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'}>  
                <Snackbar open={openInformartion} autoHideDuration={6000} onClose={handleCloseSnackInformation}>
                    <Alert onClose={handleCloseSnackInformation} severity="info" sx={{ width: '100%' }}>                        
                        Task Start process initiated with sucess!
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseSnackError}>
                    <Alert onClose={handleCloseSnackError} severity="error" sx={{ width: '100%' }}>
                        {error &&  error + " "} Try again!
                    </Alert>
                </Snackbar>
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        {taskData ? (
                            
                                <Box display="flex" >
                                    <Box flex={4}>
                                        <CardCover>
                                            <CardMedia
                                                sx={{ minHeight: 277 }}
                                                component="img"
                                                image={taskData.metadata}
                                                alt={'taskData'} />
                                            <CardCoverAction>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {taskData.reward} MATIC
                                                </Typography>
                                            </CardCoverAction>
                                        </CardCover>
                                    </Box>
                                    
                                    <Box flex={8} flexDirection={'column'}>
                                        <CardContent>
                                            <Box display={'flex'}>
                                                <Box flex={1}>
                                                    <Typography gutterBottom variant="h3" component="div" textAlign={'left'}>
                                                        {taskData.title}
                                                    </Typography>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        #8654
                                                    </Typography>
                                                    
                                                </Box>
                                                <Box flex={9}>
                                                    <Typography gutterBottom variant="h4" component="div" textAlign={'right'}>
                                                        Status: {taskData.status}
                                                    </Typography>
                                                </Box>                                                
                                            </Box>
                                            <Box mt={'20px'} display={'flex'}>
                                                <Box flex={1}>
                                                    <Typography gutterBottom variant="h5" component="div" textAlign={'left'}>
                                                        {taskData.description}
                                                    </Typography>                                                    
                                                </Box>                                                                                                
                                            </Box>
                                            <Box mt={'80px'}>                                                
                                                <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                                    Creator Role ID: {taskData.creatorRole}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                                    Authorized Role ID: {taskData.authorizedRoles}
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                                    Assignee: {taskData.assignee}
                                                </Typography>
                                            </Box>
                                            <Box mt={'50px'} display={'flex'}>
                                                <Box sx={{ margin: '5px' }} >
                                                    { 
                                                        taskData.status != "Completed" && taskData.status != "Canceled" &&
                                                        <Button
                                                            startIcon={<Start />}
                                                            variant="contained"
                                                            component="span"
                                                            onClick={handleAction}
                                                        >
                                                            {action}
                                                        </Button>
                                                    }
                                                </Box>
                                                
                                                <Box sx={{ margin: '5px' }}>
                                                    <Button
                                                        startIcon={<AccessTime />}
                                                        variant="contained"
                                                        component="span"
                                                    >
                                                        End Date: {taskData.endDate} 
                                                    </Button>    
                                                </Box>

                                                {
                                                    isLeader && taskData.status != "Canceled" &&
                                                    <Box sx={{ margin: '5px' }}>
                                                        <Button
                                                            startIcon={<CancelScheduleSendIcon />}
                                                            variant="contained"
                                                            component="span"
                                                            onClick={handleCancel}
                                                        >
                                                            Cancel Task 
                                                        </Button>    
                                                    </Box>
                                                }
                                                
                                                
                                            </Box>
                                        </CardContent>
                                    </Box>            
                                </Box>                    
                            
                        ) : (
                            console.log('Error Getting Card')
                        )}

                    </>
                )}
                </Grid>
           
        
    )
}

export default CardTasks