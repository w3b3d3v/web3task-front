import { Box, Grid, CardMedia, CardContent, Typography, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ethers } from "ethers";
import { TaskFront } from "src/models/task";

const CardAddAction = styled(Card)<{ $loading: boolean }>(
    ({ theme, $loading }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(["all"])};

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

        ${$loading &&
        `
            @keyframes shine {
                to {
                    background-position-x: -200%;
                }
            }

            .MuiCardMedia-root, .MuiTypography-root {
                background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
                background-size: 200% 100%;
                animation: 1s shine linear infinite;
                color: transparent;
            }
            `
        }      
  `
);

/**
 * CardMultiTasks Component
 *
 * A component that displays a grid of multiple cards for NFTs representing tasks.
 *
 * @component
 * @param multiTasksData - An array of TaskFront objects representing task data for multiple cards obtained from the Solidity contract function getTask() + Multicall.
 * @param loading - A boolean indicating whether the data is still loading.
 * @param page - The current page number.
 * @returns Multiple Card NFTs Grid to display
 */

export const CardMultiTasks = ({ multiTasksData, loading, page }) => {
    const handleCardSelect = (taskId) => {
        window.location.href = "/tasks/details-task/" + taskId;
    };

    const CardTasks = ({ index, item }: { index: React.Key; item?: any }) => (
        <Grid
            item
            key={index}
            xs={"auto"}
            sm={"auto"}
            md={"auto"}
            lg={"auto"}
            sx={{ margin: "18px" }}
        >
            <CardAddAction
                onClick={() => handleCardSelect((page - 1) * 20 + Number(index) + 1)}
                $loading={loading}
            >
                <Card key={index} sx={{ width: 254, height: 336 }}>
                {/* <Card key={index} sx={{ height: 316 }}> */}
                    <CardMedia
                        sx={{ width: 254, height: 248 }}
                        // sx={{ height: 228 }}
                        component="img"
                        image={item?.metadata}
                        alt={!loading && "multiTasksData"}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {!loading && item?.title}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {!loading && `${ethers.utils.formatEther(item?.reward)} ETH`}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            textAlign={"right"}
                            >
                            #{(page - 1) * 20 + Number(index) + 1}
                        </Typography>
                    </CardContent>
                </Card>
            </CardAddAction>
        </Grid>
    );

    return (
        <>
            <Grid container spacing={4} mt={5}>
                {loading ? (
                    Array.from({ length: (multiTasksData.length || 12) }, () => ({})).map(
                        (index: React.Key) => (
                            <CardTasks index={index} />
                        )
                    )
                ) : (
                    <>
                        {multiTasksData &&
                            multiTasksData.map((item: TaskFront, index: React.Key) => (
                                <CardTasks index={index} item={item} />
                            ))}
                    </>
                )}
            </Grid>
        </>
    );
};

export default CardMultiTasks;
