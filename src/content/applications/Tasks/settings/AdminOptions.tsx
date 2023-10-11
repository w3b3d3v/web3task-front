import { Button, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTaskService } from 'src/services/tasks-service';
import { useTaskServiceHook } from '../../../../hooks/TaskServiceHook';
import CoverAdminOptions from 'src/components/Cover/CoverAdminOptions';

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
                <CoverAdminOptions />

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
