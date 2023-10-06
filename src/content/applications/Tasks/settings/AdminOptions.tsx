import { Button, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTaskService } from 'src/services/tasks-service';
import { useTaskServiceHook } from '../../../../hooks/TaskServiceHook';

const AdminOptions = () => {

    const taskService = useTaskService();
    const { handleRole, handleOperator } = useTaskServiceHook(taskService);

    const [role, setRole] = useState({
        roleId: "",
        authorizedAddress: "",
        isAuthorized: false
    });

    const [operator, setOperator] = useState({
        interfaceId: "",
        roleId: "",
        isAuthorized: false
    });

    const handleInputChange = (action: string, event: { target: { name: any; value: any; }; }) => {
        if (action == 'role') {
            setRole((prevRole) => ({
                ...prevRole,
                [event.target.name]: event.target.value
            }));
        } else {
            setOperator((prevOperator) => ({
                ...prevOperator,
                [event.target.name]: event.target.value
            }));

        }
    }

    const handleSubmit = async (action: string, event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (action == 'setRole') {
            try {
                await handleRole(role.roleId, role.authorizedAddress, role.isAuthorized);

            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
            }
        } else {
            try {

                await handleOperator(operator.interfaceId, operator.roleId, operator.isAuthorized)
            } catch (error) {
                console.error('Erro ao enviar o formulário:', error);
            }
        }
    };

    return (
        <>
            <Box>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={{ xs: 'column', md: 'row' }} >

                    <Box>
                        <img
                            src="/static/images/settings/engrenagem.svg"
                            alt="Quebra Cabeca"
                            width={200}
                            height={150}
                        />
                    </Box>

                    <Box>
                        <Box>
                            <Typography color={'green'} fontSize={50}>
                                ADM OPTIONS
                            </Typography>
                        </Box>
                        <Box>
                            <img
                                src="/static/images/task/home/detail.svg"
                                alt="4 Pontos Interligados"
                                width={75}
                            />
                        </Box>
                    </Box>

                    <Box style={{ position: 'relative' }} >

                        <Box
                            style={{
                                position: 'absolute',
                                top: 'calc(50%  + 100px)',
                                left: 'calc(50%  + 250px)',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        >
                            <img
                                src="/static/images/settings/astronaut.svg"
                                alt="astronaut"
                                width={551}
                                height={325}
                                style={{
                                    pointerEvents: 'none'
                                }}
                            />
                        </Box>

                        <img
                            src="/static/images/settings/smoke-blue.svg"
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

                </Box>

                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>

                    <Stack>

                        <Box m={2} >
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setRole</Typography>
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('role', event))} name='roleId' />
                            <TextField label={'Address'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('role', event))} name='authorizedAddress' />
                            <TextField label={'isAuthorized'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('role', event))} name='isAuthorized' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setRole', event))} > Enviar  </Button>
                        </Box>

                        <Box m={2} >
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setOperator</Typography>
                            <TextField label={'InterfaceId'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='interfaceId' />
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='roleId' />
                            <TextField label={'Bool'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='isAuthorized' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setOperator', event))}> Enviar  </Button>
                        </Box>

                    </Stack>

                </Box>
            </Box >
        </>
    );
};

export default AdminOptions;
