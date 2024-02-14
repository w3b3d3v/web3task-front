import { Button, Stack, TextField, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTaskService } from 'src/services/tasks-service';
import { useTaskServiceHook } from '../../../../hooks/TaskServiceHook';
import { useWeb3Utils } from "src/hooks/Web3UtilsHook";
import { Helmet } from 'react-helmet-async';

const AdminOptions = () => {

    const taskService = useTaskService();
    const { handleRole, handleOperator, handleQuorum, handleDeposit, handleRoleName } = useTaskServiceHook(taskService);
    const { setCurrentRole, getUserRole, userAddress } = useWeb3Utils();

    const [role, setRole] = useState({
        roleId: "",
        authorizedAddress: "",
        isAuthorized: false
    });

    const [currentRoleField, setCurrentRoleField] = useState(0);

    const [roleName, setRoleName] = useState({
        id: "",
        name: ""
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
            case "roleName": {
                setRoleName((prevOperator) => ({
                    ...prevOperator,
                    [event.target.name]: event.target.value
                }));
                break;
            }
            case "currentRole": {
                const novoNumero = parseInt(event.target.value, 10);
                setCurrentRoleField(novoNumero);
                break
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
            case "setRoleName": {
                try {
                    await handleRoleName(roleName.id, roleName.name)
                } catch (error) {
                    console.error('Error when filling the form:', error);
                }
                break;
            }
            case "setCurrentRoleField": {
                const userData = { role: currentRoleField.toString() };
                localStorage.setItem(userAddress(), JSON.stringify(userData));
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
            <Box mt={5}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={5}>
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
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setRoleName</Typography>
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('roleName', event))} name='id' />
                            <TextField label={'Role Name'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('roleName', event))} name='name' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setRoleName', event))}>Enviar</Button>
                        </Box>
                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setOperator</Typography>
                            <FormControl sx={{ mr: 2, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">InterfaceId</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={operator.interfaceId}
                                    label="InterfaceId"
                                    onChange={(event) => (handleInputChange('operator', event))}
                                    name='interfaceId'
                                >
                                    <MenuItem value="0xe610a2dd">CreateTask</MenuItem>
                                    <MenuItem value="0x1397e04a">CancelTask</MenuItem>
                                    <MenuItem value="0xf3ae70f0">StartTask</MenuItem>
                                    <MenuItem value="0xc66e9543">ReviewTask</MenuItem>
                                    <MenuItem value="0x108c8ae4">CompleteTask</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='roleId' />
                            <TextField label={'Bool'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('operator', event))} name='isAuthorized' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setOperator', event))}>Enviar</Button>
                        </Box>
                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>setQuorum</Typography>
                            <TextField label={'Value'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('quorum', event))} name='value' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setQuorum', event))}>Enviar</Button>
                        </Box>

                        <Box m={2}>
                            <Typography sx={{ alignItems: 'left' }} fontWeight={'bold'} fontSize={'24px'} mb={2}>Opering at role</Typography>
                            <TextField label={'Role ID'} sx={{ mr: 2 }} onChange={(event) => (handleInputChange('currentRole', event))} name='value' />
                            <Button variant='contained' onClick={(event) => (handleSubmit('setCurrentRoleField', event))}>Enviar</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </>
    );
};

export default AdminOptions;
