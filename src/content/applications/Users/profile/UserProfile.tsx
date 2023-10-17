import { Box, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect, useState } from "react";
import CardMultiTasks from "src/components/Task/CardMultiTasks";
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";
import usePagination from "src/components/Pagination";
import CoverUserProfile from "src/components/Cover/CoverUserProfile";
import SearchFilters from "src/components/Task/SearchFiltersTasks";
import { useSearchFilters } from "src/hooks/useSearchFilters";

const BoxCover = styled(Box)(
    ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(48)};
    }
`
);

const BoxCoverAction = styled(Box)(
    ({ theme }) => `
    position: absolute;
    item-align: center;
    top: 100%;
`
);

const UserProfile = () => {
    const { shortenAddressFromUser, userAddress } = useWeb3Utils();
    const taskService = useTaskService();
    const { handleCountUserTasks, countUserTasks, handleMultiTask, multiTasksData, loading } = useTaskServiceHook(taskService);
    const [tasksPerPage, setTasksPerPage] = useState<number>(4);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [maxTasks, setMaxTasks] = useState<number>(4);
    const [minimumTasks, setMinimumTasks] = useState<number>(1);
    const { currentPage, Pagination } = usePagination();
    const { filter: filterTasks } = useSearchFilters();
    const [userScore, setUserScore] = useState<number>();
    
    const fetchData = async () => {
        try {                            
            await handleCountUserTasks().then(count => {
                const total = (parseInt(count)/tasksPerPage)
                if ((parseInt(count)%tasksPerPage) > 0)
                    setTotalPages(Math.floor(total) + 1)                                 
                else
                    setTotalPages(total)                             
            });
            await handleMultiTask(minimumTasks, maxTasks, true);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    
    const maxReward = multiTasksData?.reduce((acc, curr) => {
        const parsedReward = Number.parseFloat(curr.reward)

        return parsedReward > acc ? parsedReward : acc
    }, 0) || 0

    const filteredMultiTasks = filterTasks(multiTasksData || [])
    
    useEffect(() => {  
        setMinimumTasks(((currentPage - 1) * tasksPerPage) + 1);
        setMaxTasks(currentPage * tasksPerPage);           
        fetchData();        
    }, [currentPage, totalPages, minimumTasks, maxTasks]);
    
  return (
        <>
            <Helmet>
                <title>Web3Task - Profile</title>
            </Helmet>
            <Box>
                <BoxCover display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={"row"} >
                    <Box style={{ position: 'relative' }} >
                        <Box
                            style={{
                                position: 'absolute',
                                top: 'calc(50%  + 0px)',
                                left: 'calc(50%  - 315px)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        >
                            <img
                                src="/static/images/user/profile/cube.svg"
                                alt="astronaut"
                                width={251}
                                style={{
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>

                        <Box
                            style={{
                                position: 'absolute',
                                top: 'calc(50%  + 180px)',
                                left: 'calc(50%  - 250px)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        >
                            <img
                                src="/static/images/user/profile/profile.svg"
                                alt="astronaut"
                                width={251}
                                style={{
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>

                        <img
                            src="/static/images/user/profile/smoke-green.svg"
                            alt="smoke"
                            width={966}
                            height={869}
                            style={{
                                position: 'absolute',
                                top: 'calc(50%  + 230px)',
                                left: 'calc(50% - 250px)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1,
                                pointerEvents: 'none',
                            }}
                        />

                    </Box>

                    <Box>
                        <CoverUserProfile />
                    </Box>

                    <Box style={{ position: 'relative' }} >

                        <Box
                            style={{
                                position: 'absolute',
                                top: 'calc(50%  + 100px)',
                                left: 'calc(50%  + 150px)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        >
                            <img
                                src="/static/images/user/profile/astronaut.svg"
                                alt="astronaut"
                                width={551}
                                height={325}
                                style={{
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>

                        <img
                            src="/static/images/user/profile/smoke-blue.svg"
                            alt="smoke"
                            width={966}
                            height={869}
                            style={{
                                position: 'absolute',
                                top: 'calc(50%  + 230px)',
                                left: 'calc(50% + 300px)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1,
                                pointerEvents: 'none',
                            }}
                        />

                    </Box>
                    <BoxCoverAction>
                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                            {shortenAddressFromUser()}
                        </Typography>
                        User Task Score: { isNaN(userScore) ? "Not loaded." : userScore }
                    </BoxCoverAction>

                </BoxCover>
                <Box>

                    <Grid container spacing={5} mt={10} ml={10} mr={15} style={{ width: '100%' }} >
                        <Grid item xs={2} mt={5}>
                            <SearchFilters maxReward={maxReward} />
                        </Grid>

                        <Grid item xs={10} style={{ width: '100%' }}>
                            <CardMultiTasks multiTasksData={filteredMultiTasks} loading={loading} page={currentPage} />
                        </Grid>
                    </Grid>
                </Box>

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={10}>
                    <Pagination numPages={totalPages} />
                </Box>

            </Box>

        </>
    )
}

export default UserProfile