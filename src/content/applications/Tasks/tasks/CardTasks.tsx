import { useState, forwardRef, useEffect } from 'react';
import { Box, Button, Grid, CardMedia, CardContent, Typography, Card, useMediaQuery } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'
import AccessTime from '@mui/icons-material/AccessTime';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useTaskService } from "src/services/tasks-service";
import { useWeb3Utils } from 'src/hooks/Web3UtilsHook';
import { useTheme } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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

export const CardTasks = ({ taskId, taskData, loading }: any) => {
    const { startTask, reviewTask, completeTask, cancelTask, hasMemberRole, hasLeaderRole } = useTaskService();
    const [openInformartion, setOpenInformartion] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState<string>();
    const [action, setAction] = useState<string>();
    const { userAddress } = useWeb3Utils();
    const [isMember, setIsMember] = useState<boolean>(false);
    const [isLeader, setIsLeader] = useState<boolean>(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

    useEffect(() => {
        console.log("taskData", taskData)
        if (taskData != null) {
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
                    {error && error + " "} Try again!
                </Alert>
            </Snackbar>
            {loading ? (
                <SuspenseLoader />
            ) : (
                <>
                    {taskData ? (

                        <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} alignItems="center" >
                            <Box display='flex' justifyContent={'center'} alignContent={'center'} >
                                <Box sx={{ position: 'relative' }}>
                                    <Card sx={{ width: 277, height: 277 }}>
                                        <CardMedia
                                            sx={{ width: 277, height: 277 }}
                                            component="img"
                                            image={taskData.metadata}
                                            alt={'taskData'}
                                        />
                                        <CardContent sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '42px',
                                            color: 'white',
                                            padding: '10px',
                                            textAlign: 'right',
                                            fontFamily: 'Istok Web',
                                            fontWeight: '400'
                                        }}>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                style={{
                                                    textAlign: isSmallScreen ? 'left' : 'right',
                                                    marginLeft: isSmallScreen ? 'auto' : 'unset',
                                                }}
                                            >
                                                Reward {taskData.reward} USD
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>

                            <Box flexDirection={'column'} height={'282px'} width={'432px'} >
                                <CardContent>
                                    <Box>
                                        <Box display={'flex'} justifyContent="space-between" alignItems="center"  >
                                            <Typography gutterBottom variant="h3" component="div" textAlign={'left'} >
                                                {taskData.title}
                                            </Typography>

                                            <OpenInNewIcon style={{
                                                cursor: 'pointer'
                                            }} />

                                        </Box>
                                        <Typography gutterBottom variant='subtitle2' component="div">
                                            #8654
                                        </Typography>

                                    </Box>

                                    <Box mt={4}>
                                        <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                            Creator Role ID: {taskData.creatorRole}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                            Authorized Role ID: [{taskData.authorizedRoles}]
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                            Assignee: {taskData.assignee}
                                        </Typography>
                                    </Box>

                                    <Box display={'flex'} justifyContent="space-between" mt={6} >
                                        {
                                            taskData.status != "Completed" && taskData.status != "Canceled" &&
                                            <Button

                                                variant="contained"
                                                component="span"
                                                onClick={handleAction}
                                            >
                                                {action}
                                            </Button>
                                        }
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
                                                variant="contained"
                                                component="span"
                                                onClick={handleCancel}
                                            >
                                                Cancel Task
                                            </Button>
                                        </Box>
                                    }

                                </CardContent>
                            </Box>
                        </Box >

                    ) : (
                        console.log('Error Getting Card')
                    )
                    }

                </>
            )
            }
        </Grid >

    )
}

export default CardTasks