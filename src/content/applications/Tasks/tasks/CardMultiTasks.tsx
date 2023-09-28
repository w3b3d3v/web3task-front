import { Grid, CardMedia, CardContent, Typography, Card } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'
import { TaskFront } from 'src/models/task';

export const CardMultiTasks = ({ multiTasksData, loading }) => {

    return (
        <>
            <Grid container spacing={2} >
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        {multiTasksData ? (
                            multiTasksData.map((item: TaskFront, index: React.Key) => (
                                <Grid item key={index} xs={3} sx={{ margin: '5px' }}>
                                    <Card key={index} sx={{ width: 254, height: 336 }}>
                                        <CardMedia
                                            sx={{ width: 254, height: 248 }}
                                            component="img"
                                            image={item.metadata}
                                            alt={'multiTasksData'}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.reward.toString()} MATIC
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                                #{item.creatorRole.toString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            console.log('Error Getting Card')
                        )}

                    </>
                )}
            </Grid >
        </>
    )
}

export default CardMultiTasks

