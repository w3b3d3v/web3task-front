import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const CoverHomeTasks = () => {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={304} flexDirection={"row"} >

            <Box>
                <img
                    src="/static/images/logo/2491992.svg"
                    alt="Logo Web3task"
                    width={200}
                    height={150}
                />
            </Box>

            <Box>
                <Box>
                    <Typography color={'green'} fontFamily='istok' fontSize={50}>
                        WEB3TASK
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
    )
}

export default CoverHomeTasks