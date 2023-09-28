import { CardMedia, CardContent, Typography, Card } from '@mui/material'
import SuspenseLoader from 'src/components/SuspenseLoader'

/**
 * CardTasks Component
 *
 * A component that displays a card for an NFT representing a task.
 *
 * @component
 * @param taskData - An array of TaskFront objects representing task data obtained from the Solidity contract function getTask().
 * @param loading - A boolean indicating whether the data is still loading.
 * @returns Multiple Card NFTs Grid to display 
 */

export const CardTasks = ({ taskData, loading }: any) => {


    return (
        <>
            <Card sx={{ width: 254, height: 336 }}>
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        {taskData ? (
                            <>
                                <CardMedia
                                    sx={{ width: 254, height: 248 }}
                                    component="img"
                                    image={taskData.metadata}
                                    alt={'taskData'} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {taskData.title}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {taskData.reward} MATIC
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                        #{taskData.creatorRole}
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