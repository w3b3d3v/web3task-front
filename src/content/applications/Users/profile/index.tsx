import { Grid, Box, Container, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect } from "react";
import CardMultiTasks from "src/content/applications/Tasks/tasks/CardMultiTasks";
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";

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
    const { shortenAddressFromUser } = useWeb3Utils();
    const taskService = useTaskService();

    // Instância do hook useTaskServiceHook
    const { handleMultiTask, multiTasksData, loading, error } = useTaskServiceHook(taskService);

    // const fetchData = async () => {
    //     // Chama as operações assíncronas ao montar o componente
    //     //await handleMultiUserTasks(accountData?.address);
    //     await handleMultiTask(0,10);
    // };

    useEffect(() => {
        const fetchData = async () => {
            // Chama as operações assíncronas ao montar o componente
            //await handleTask(1);
            await handleMultiTask(1,10,true);
        };

        fetchData();
    }, []); // Dependência vazia significa que isso será executado apenas uma vez no montar do componente

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
                        <Box>
                            <img
                                src="/static/images/user/profile/title-profile-banner.svg"
                                
                            />
                        </Box>
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
                            { shortenAddressFromUser() }
                        </Typography>
                    </BoxCoverAction>
                                        
                </BoxCover>
                <Box mt={'7%'}>
                    <Box>                        
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >
                            <Box>

                            </Box>

                            <CardMultiTasks multiTasksData={multiTasksData} loading={loading} />
                        </Box >
                    </Box>
                </Box>
                               
            </Box>

        </>
    )
}

export default UserProfile