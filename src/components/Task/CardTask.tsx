import { useState, useEffect } from 'react';
import { Box, Button, Grid, IconButton, CardMedia, CardContent, Typography, Card, useMediaQuery, Tooltip } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'
import AccessTime from '@mui/icons-material/AccessTime';
import { AlertColor } from '@mui/material/Alert';
import { useTaskService } from "src/services/tasks-service";
import { useWeb3Utils } from 'src/hooks/Web3UtilsHook';
import { useTheme } from '@mui/system';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Close from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';
import { useSnackBar } from 'src/contexts/SnackBarContext';
import { ethers } from 'ethers';
import FormDialog from '../FormDialog';

/**
 * CardTasks Component
 *
 * A component that displays a card for an NFT representing a task.
 *
 * @component
 * @param taskId - ID of the Task
 * @param taskData - An array of TaskFront objects representing task data obtained from the Solidity contract function getTask().
 * @param loading - A boolean indicating whether the data is still loading.
 * @returns Card NFT to display
 */


export const CardTask = ({ taskId, taskData, loading }: any) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const { startTask, reviewTask, completeTask, cancelTask, hasMemberRole, hasLeaderRole, hasVoted, getMinQuorum, getQuorumApprovals } = useTaskService();
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState<string>();
    const [action, setAction] = useState<string>();
    const { userAddress } = useWeb3Utils();
    const [approvals, setApprovals] = useState<string>();
    const [openForm, setOpenForm] = useState<boolean>(false);

    const { showSnackBar } = useSnackBar();

    const handleSnackbar = (message: string, color: AlertColor) => {
        showSnackBar(message, color)
    };

    const handleOpenForm = async () => {
        setOpenForm(true);
    };

    const handleCloseForm = async () => {
        setOpenForm(false)
    };

    const handleFormSubmit = async (metadata: any) => {
        setOpenForm(false);
        await reviewTask(BigInt(taskId), metadata, [getUserRoleInt()], taskData.assignee);
    }

    const getAction = async (status: string) => {
        switch (status) {
            case "Created":
                setAction("Start Task")
                break;
            case "Progress":
                setAction("Review Task")
                break;
            case "Review":
                setAction("Review Task")
                break;
            default:
                break;
        }
    }

    const handleAction = async () => {
        try {
            switch (taskData.status) {
                case "Created":
                    await startTask(BigInt(taskId), [getUserRoleInt()], taskData.assignee);
                    break;
                case "Progress":
                    handleOpenForm();
                    break;
                case "Review":
                    handleOpenForm();
                    break;
                default:
                    break;
            }

        } catch (error) {
            setError(error.message)
            setOpenError(true);
        }
    };

    const handleCancel = async () => {
        try {
            await cancelTask(BigInt(taskId), getUserRoleInt());
            handleSnackbar('Cancel Task process initiated with success!', 'warning')
        } catch (error) {
            setError(error.message)
            setOpenError(true);
        }
    }

    const handleConfirm = async () => {
        try {
            await completeTask(BigInt(taskId), [getUserRoleInt()]);
        } catch (error) {
            setError(error.message)
            setOpenError(true);
        }
    }

    const handleApprovals = async () => {
        try {
            const approvals = await getQuorumApprovals(taskId);
            const minQuorum = await getMinQuorum();
            const remain = " (" + String(approvals == null ? 0 : approvals) + "/" + String(minQuorum) + ")";
            setApprovals(remain);
        } catch (error) {
            setError(error.message)
            setOpenError(true);
        }
    }

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            handleSnackbar("Copy to Clipboard", 'info')
        } catch (err) {
            console.error('Failed to copy: ', err);
            handleSnackbar("Failed to copy to clipboard", 'error')
        }
    }

    const getUserRoleInt = () => {
        const storedUserData = JSON.parse(localStorage.getItem(userAddress()));
        return parseInt(storedUserData.role, 10);
    };

    useEffect(() => {
        if (taskData != null) {
            getAction(taskData.status);
            handleApprovals();
        }
    }, [])

    return (

        <Grid item xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'}>

            {loading ? (
                <SuspenseLoader />
            ) : (
                <>
                    {taskData ? (

                        <Box display="flex" flexDirection={smDown ? 'column' : 'row'} alignItems="center">
                            <Box display='flex' justifyContent={'center'} alignContent={'center'} sx={{ mb: smDown ? 5 : 0, ml: smDown ? 10 : 0 }}>
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
                                            padding: '0px',
                                            textAlign: 'center',
                                            fontFamily: 'Istok Web',
                                            fontWeight: '400'
                                        }}>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                style={{
                                                    textAlign: smDown ? 'left' : 'center',
                                                    backgroundColor: '#000000',
                                                }}
                                            >
                                                Reward {ethers.utils.formatEther(taskData.reward)} ETH
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>

                            <Box flexDirection={'column'} height={'282px'} width={'432px'} sx={{ ml: smDown ? 10 : 0 }}>
                                <CardContent>
                                    <Box>
                                        <Box display={'flex'} justifyContent="space-between" alignItems="center"  >
                                            <Typography gutterBottom variant="h3" component="div" textAlign={'left'} >
                                                {taskData.title}
                                            </Typography>
                                            <Box display={'flex'} justifyContent="space-between" alignItems="center">

                                                {
                                                    taskData.status != "Canceled" && taskData.status != "Completed" && taskData.status != "Created" && taskData.status != "Progress" &&
                                                    <Tooltip key={"topApprovals"} placement={"top"} title="Approvals">
                                                        <Typography >
                                                            {approvals}
                                                        </Typography>
                                                    </Tooltip>
                                                }

                                                {
                                                    taskData.status != "Canceled" && taskData.status != "Completed" && taskData.status != "Created" && taskData.status != "Progress" &&
                                                    <Tooltip key={"topComplete"} placement={"top"} title="Complete Task">
                                                        <IconButton color="primary"
                                                            onClick={handleConfirm}>
                                                            <Check />
                                                        </IconButton>
                                                    </Tooltip>
                                                }

                                                {
                                                    taskData.status != "Canceled" && taskData.status != "Completed" && taskData.status != "Created" && taskData.status != "Progress" &&
                                                    <Tooltip key={"top"} placement={"top"} title="Cancel Task">
                                                        <IconButton color="primary"
                                                            onClick={handleCancel}>
                                                            <Close />
                                                        </IconButton>
                                                    </Tooltip>
                                                }

                                                <Tooltip key={"topContent"} placement={"top"} title="Share URL">
                                                    <IconButton color="primary"
                                                        onClick={copyContent}>
                                                        <OpenInNewIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                        <Typography gutterBottom variant='subtitle2' component="div">
                                            #{taskId}
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

                                    <Box display={'flex'} justifyContent="space-between" mt={6} sx={{ justifyContent: smDown ? 'center' : 'space-between' }}>
                                        {
                                            taskData.status != "Completed" && taskData.status != "Canceled" &&
                                            <>
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    onClick={handleAction}
                                                >
                                                    {action}
                                                </Button>

                                                {openForm && <FormDialog openForm={openForm} closeForm={handleCloseForm} onSubmit={handleFormSubmit} />}

                                            </>

                                        }
                                        <Button
                                            startIcon={<AccessTime />}
                                            variant="contained"
                                            component="span"
                                            style={{
                                                backgroundColor: 
                                                taskData.status === "Completed" 
                                                ? "green" 
                                                : taskData.status === "Canceled" 
                                                ? "red" 
                                                : "initial",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderRadius: "12px",
                                                padding: "6px 16px",
                                            }}
                                        >
                                            {taskData.status === "Completed" || taskData.status === "Canceled" ? "Ended" : `End Date: ${taskData.endDate}`}
                                        </Button>

                                    </Box>

                                </CardContent>

                            </Box>

                        </Box >
                    ) : (
                        console.log('Error Getting Card')
                    )}
                </>
            )}
        </Grid >
    )
}

export default CardTask