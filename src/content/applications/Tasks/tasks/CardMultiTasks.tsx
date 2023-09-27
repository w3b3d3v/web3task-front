import { CardMedia, CardContent, Typography, Card } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'

export const CardMultiTasks = ({ multiTasksData, loading }: any) => {
    console.log('multiTasksData = ', multiTasksData);
    return (
        <>
            <Card sx={{ width: 254, height: 336 }}>
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        {/* {multiTasksData && multiTasksData[0] ? (
                            <>
                                <CardMedia
                                    sx={{ width: 254, height: 248 }}
                                    component="img"
                                    image={multiTasksData[8]}
                                    alt={multiTasksData[1]} /><CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Name: {multiTasksData[1]}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {multiTasksData[2]}
                                    </Typography>
                                </CardContent>
                            </>
                        ) : (
                            console.log('Error Getting MultiCard')
                        )} */}

                    </>
                )}
            </Card>
        </>
    )
}

export default CardMultiTasks