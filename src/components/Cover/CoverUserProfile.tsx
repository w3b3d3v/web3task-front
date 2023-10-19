import { Box, Typography, useMediaQuery } from '@mui/material'
import {
    useTheme,
} from "@mui/material";

const CoverCreateTask = () => {
    const theme = useTheme();
    const  mdDown  = useMediaQuery(theme.breakpoints.down('md'));
    const  xsDown  = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={"row"} >

            <Box ml={mdDown && 8}>
                <Box style={{ zIndex: 3 }} >
                    <Typography color={theme.colors.primary} fontWeight={"bold"} fontSize={mdDown ? 35 : xsDown ? 20 : 50}>
                        PERSONAL PROFILE
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

        </Box>
    )
}

export default CoverCreateTask