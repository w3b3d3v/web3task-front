import { Box, Typography } from '@mui/material'

const CoverCreateTask = () => {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={"row"} >

            <Box>

                <Box>
                    <Typography color={'green'} fontSize={50}>
                        CREATE TASK
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
                    src="/static/images/task/createTask/dado.svg"
                    alt="Quebra Cabeca"
                    width={200}
                    height={150}
                />
            </Box>

        </Box>
    )
}

export default CoverCreateTask