import { Grid, CardMedia, CardContent, Typography, Card } from '@mui/material'
import { styled } from '@mui/material/styles';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { TaskFront } from 'src/models/task';

/**
 * CardMultiTasks Component
 *
 * A component that displays a grid of multiple cards for NFTs representing tasks.
 *
 * @component
 * @param multiTasksData - An array of TaskFront objects representing task data for multiple cards obtained from the Solidity contract function getTask() + Multicall.
 * @param loading - A boolean indicating whether the data is still loading.
 * @returns Multiple Card NFTs Grid to display 
 */

const CardAddAction = styled(Card)(
    ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          height: 100%;
          color: ${theme.colors.primary.main};
          transition: ${theme.transitions.create(['all'])};
          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[70]};
            cursor: pointer;
          }
  `
);

export const CardMultiTasks = ({ multiTasksData, loading, page }) => {

    const handleCardSelect = (taskId) => {
        window.location.href = "/tasks/details-task/" + taskId;
    };

    return (
        <>
            <Grid container spacing={4} ml={15} mt={5}>
                {loading ? (
                    <SuspenseLoader />
                ) : (
                    <>
                        {multiTasksData && (
                            multiTasksData.map((item: TaskFront, index: React.Key) => (
                                <Grid item key={index} xs={'auto'} sm={'auto'} md={'auto'} lg={'auto'} sx={{ margin: '5px' }}>
                                    <CardAddAction onClick={() => handleCardSelect((page - 1) * 20 + Number(index) + 1)}>
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
                                                    {item.reward} MATIC
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div" textAlign={'right'}>
                                                    #{item.creatorRole}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </CardAddAction>
                                </Grid>
                            ))
                        )}
                    </>
                )}
            </Grid >
        </>
    )
}

export default CardMultiTasks

