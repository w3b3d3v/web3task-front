import { Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import {
    useTheme,
} from "@mui/material";

const CoverHomeTasks = () => {
    const theme = useTheme();
    const  mdDown  = useMediaQuery(theme.breakpoints.down('md'));
    const  smDown  = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} >

            <Box ml={smDown && 3}>
                <img
                    src="/static/images/task/home/web3task-home-task.svg"
                    alt="Logo Web3task"
                    width={200}
                    height={150}
                />
            </Box>

            <Box >
                <Box>
                    <Typography color={theme.colors.primary} fontWeight={"bold"} fontSize={smDown ? 20 : mdDown ? 30 : 50}>
                        WEB3TASK
                    </Typography>
                </Box>
                <Box>
                    <img
                        src="/static/images/task/home/detail.svg"
                        alt="4 Pontos Interligados"
                        width={mdDown ? 55 : 75}
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
    )
}

export default CoverHomeTasks