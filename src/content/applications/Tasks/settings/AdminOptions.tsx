import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTaskService } from 'src/services/tasks-service';
import { useTaskServiceHook } from '../../../../hooks/TaskServiceHook';
import CoverAdminOptions from 'src/components/Cover/CoverAdminOptions';
import { Helmet } from 'react-helmet-async';

const AdminOptions = () => {

    const taskService = useTaskService();
    const { handleRole, handleOperator, handleQuorum, handleDeposit } = useTaskServiceHook(taskService);

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

    const [quorum, setQuorum] = useState({
        value: ""
    });

    const [deposit, setDeposit] = useState({
        roleId: "",
        amount: ""
    });

    const handleInputChange = (action: string, event: { target: { name: any; value: any; }; }) => {
        switch (action) {
            case "role": {
                setRole((prevRole) => ({
                    ...prevRole,
                    [event.target.name]: event.target.value
                }));
                break;
            }
            case "operator": {
                setOperator((prevOperator) => ({
                    ...prevOperator,
                    [event.target.name]: event.target.value
                }));
                break;
            }
            case "quorum": {
                setQuorum((prevOperator) => ({
                    ...prevOperator,
                    [event.target.name]: event.target.value
                }));
                break;
            }
            case "deposit": {
                setDeposit((prevOperator) => ({
                    ...prevOperator,
                    [event.target.name]: event.target.value
                }));
                break;
            }
            default: {
                console.log('defaulted handleInputChange');
            }
        }
    }

    const handleSubmit = async (action: string, event: { preventDefault: () => void; }) => {
        event.preventDefault();

        switch (action) {
            case "setRole": {
                try {
                    await handleRole(role.roleId, role.authorizedAddress, role.isAuthorized);

                } catch (error) {
                    console.error('Error when filling the form:', error);
                }
                break;
            }
            case "setOperator": {
                try {
                    await handleOperator(operator.interfaceId, operator.roleId, operator.isAuthorized)
                } catch (error) {
                    console.error('Error when filling the form:', error);
                }
                break;
            }
            case "setQuorum": {
                try {
                    await handleQuorum(BigInt(quorum.value))
                } catch (error) {
                    console.error('Error when filling the form:', error);
                }
                break;
            }
            case "setDeposit": {
                try {
                    await handleDeposit(deposit.roleId, deposit.amount)
                } catch (error) {
                    console.error('Error when filling the form:', error);
                }
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Web3Task - Adm Settings</title>
            </Helmet>
            <Box>
                <CoverAdminOptions />
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Stack>
                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>Deposit</Typography>
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('deposit', event))} name='roleId' />
                            <TextField label={'Amount'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('deposit', event))} name='amount' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setDeposit', event))}>Enviar</Button>
                        </Box>
                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setRole</Typography>
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('role', event))} name='roleId' />
                            <TextField label={'Address'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('role', event))} name='authorizedAddress' />
                            <TextField label={'isAuthorized'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('role', event))} name='isAuthorized' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setRole', event))} >Enviar</Button>
                        </Box>
                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setOperator</Typography>
                            <TextField label={'InterfaceId'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='interfaceId' />
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='roleId' />
                            <TextField label={'Bool'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='isAuthorized' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setOperator', event))}>Enviar</Button>
                        </Box>
                        <Box>
                            <Card sx={{ width: 250 }}>
                                <CardContent>
                                    <Typography variant='h4'>
                                        Interface ID
                                    </Typography>
                                    <Typography>
                                        createTask - 0xe610a2dd
                                    </Typography>
                                    <Typography>
                                        CancelTask - 0x1397e04a
                                    </Typography>
                                    <Typography>
                                        startTask - 0xf3ae70f0
                                    </Typography>
                                    <Typography>
                                        reviewTask - 0xc66e9543
                                    </Typography>
                                    <Typography>
                                        CompleteTask - 0xc66e9543
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setQuorum</Typography>
                            <TextField label={'Value'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('quorum', event))} name='value' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setQuorum', event))}>Enviar</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default AdminOptions;
