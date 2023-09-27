import { CardMedia, CardContent, Typography, Card } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'

export const CardTasks = ({ taskData, loading }: any) => {

    return (
        <>
            <Card sx={{ width: 254, height: 336 }}>
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        {taskData && taskData[8] ? (
                            <>
                                <CardMedia
                                    sx={{ width: 254, height: 248 }}
                                    component="img"
                                    image={taskData[8]}
                                    alt={taskData[1]} /><CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Name: {taskData[1]}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {taskData[2]}
                                    </Typography>
                                </CardContent>
                            </>
                        ) : (
                            console.log('Error Getting Card')
                        )}

                    </>
                )}
            </Card>
        </>
    )
}

export default CardTasks