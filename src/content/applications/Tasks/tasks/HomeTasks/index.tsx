import { Box, Card, CardMedia, SvgIcon, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TuneIcon from '@mui/icons-material/Tune';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useTaskService } from "src/services/tasks-service";
const HomeTask = async () => {

    const { getTask, getMultiTasks } = useTaskService();

    async function handleTask() {

        try {
            const task1 = await getTask(1);
            return task1;
        } catch (error) {
            console.log('error', error);
        }
    }

    async function handleMulticallTask() {

        try {
            const multicallTask = await Promise.resolve(getMultiTasks(0, 2));
            return multicallTask;

        } catch (error) {
            console.log('error', error);
        };

    }

    //TO DO - Create Hook to deal with async functions Contract Handler
    const task2 = await handleTask();
    console.log('task1', task2);

    const multicallTaskH = await handleMulticallTask();
    console.log('multicallTaskH', multicallTaskH);


    return (
        <>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={"row"} >

                <Box>
                    <img
                        src="/static/images/task/home/quebra-cabeca.svg"
                        alt="Quebra Cabeca"
                        width={200}
                        height={150}
                    />
                </Box>

                <Box>
                    <Box>
                        <Typography color={'green'} fontSize={50}>
                            WEB3 TASK
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

                <Box>
                    <img
                        src="/static/images/task/home/star1.svg"
                        alt="Estrela"
                        width={50}
                        height={50}

                    />
                    <img
                        src="/static/images/task/home/star2.svg"
                        alt="Estrela"
                        width={50}
                        height={50}

                    />

                </Box>

            </Box>

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={40} bgcolor={'#8EFFC2'} >

            </Box>

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>

                <Box alignItems={'center'} justifyContent={'left'} flexDirection={'column'}>
                    <TuneIcon /> Filtro
                    <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                    >
                        <TreeItem nodeId="1" label="Título">
                            <TreeItem nodeId="2" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="3" label="Criador">
                            <TreeItem nodeId="4" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="5" label="Status">
                            <TreeItem nodeId="6" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="7" label="Pagamento por Hora">
                            <TreeItem nodeId="8" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="9" label="Data vencimento">
                            <TreeItem nodeId="10" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="11" label="Horas estimadas">
                            <TreeItem nodeId="12" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="13" label="Papéis Autorizados">
                            <TreeItem nodeId="14" label="Calendar" />
                        </TreeItem>

                        <TreeItem nodeId="15" label="Descrição">
                            <TreeItem nodeId="16" label="Calendar" />
                        </TreeItem>

                    </TreeView>
                </Box>

                <Box>
                    <Card sx={{
                        width: 159,
                        height: 210
                    }}>
                        <CardMedia
                            sx={{
                                width: 159,
                                height: 155
                            }}
                            image=""
                            title="NFT 1"

                        />

                    </Card>
                </Box>

            </Box >

        </>
    )
}

export default HomeTask