import { Box, SvgIcon, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TuneIcon from '@mui/icons-material/Tune';
import { TreeItem, TreeView } from "@mui/lab";
const HomeTask = () => {
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
                <Typography color={"black"} fontSize={20} fontWeight={'bold'}>
                    Rust React UI/UX DeFi HTML Java AI C++ Solidity Typescript CSS WEB3 NFT Design Python DevOps Block
                </Typography>

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
                    Tarefas Criadas
                </Box>

            </Box >

        </>
    )
}

export default HomeTask