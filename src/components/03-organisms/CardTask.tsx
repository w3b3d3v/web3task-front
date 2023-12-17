import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  CardMedia,
  CardContent,
  Typography,
  Card,
  useMediaQuery,
} from "@mui/material";
import Loader from "@/components/01-atoms/Loader";
import { HiOutlineClock, HiOutlineExternalLink } from "react-icons/hi";
import { useTaskService } from "@/services/tasks-service";
import { useWeb3Utils } from "@/hooks/Web3UtilsHook";
import { useTheme } from "@mui/system";
import { toast } from "react-toastify";

/**
 * CardTasks Component
 *
 * A component that displays a card for an NFT representing a task.
 *
 * @component
 * @param taskId - ID of the Task
 * @param taskData - An array of TaskFront objects representing task data obtained from the Solidity contract function getTask().
 * @param loading - A boolean indicating whether the data is still loading.
 * @returns Card NFT to display
 */

export const CardTask = ({ taskId, taskData, loading }: any) => {
  const {
    startTask,
    reviewTask,
    completeTask,
    cancelTask,
    hasMemberRole,
    hasLeaderRole,
  } = useTaskService();
  const [openError, setOpenError] = useState(false);
  const [error, setError] = useState<string>();
  const [action, setAction] = useState<string>();
  const { userAddress } = useWeb3Utils();
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const getAction = (status: string) => {
    switch (status) {
      case "Created":
        setAction("Start Task");
        break;
      case "In Progress":
        setAction("Review Task");
        break;
      case "In Review":
        setAction("Complete Task");
        break;
      default:
        break;
    }
  };

  const handleAction = async () => {
    try {
      switch (taskData.status) {
        case "Created":
          await startTask(BigInt(taskId));
          toast.info("Task Start process initiated with success!");
          break;
        case "In Progress":
          await reviewTask(BigInt(taskId));
          toast.info("Review Task process initiated with success!");
          break;
        case "In Review":
          await completeTask(BigInt(taskId));
          toast.info("Complete Task process initiated with success!");
          break;
        default:
          break;
      }
    } catch (error) {
      let errorMessage = "Unexpected error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setOpenError(true);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelTask(BigInt(taskId));
      toast.warning("Cancel Task process initiated with success!");
    } catch (error) {
      let errorMessage = "Unexpected error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (!taskData) {
      return;
    }

    getAction(taskData.status);

    const address = userAddress();

    if (!address) {
      return;
    }

    hasLeaderRole(address).then((result) => {
      setIsLeader(result);
    });

    hasMemberRole(address).then((result) => {
      setIsMember(result);
    });
  }, [hasLeaderRole, hasMemberRole, taskData, userAddress]);

  return (
    <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {taskData ? (
            <Box
              display="flex"
              flexDirection={isSmallScreen ? "column" : "row"}
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Box sx={{ position: "relative" }}>
                  <Card sx={{ width: 277, height: 277 }}>
                    <CardMedia
                      sx={{ width: 277, height: 277 }}
                      component="img"
                      image={taskData.metadata}
                      alt={"taskData"}
                    />
                    <CardContent
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "42px",
                        color: "white",
                        padding: "10px",
                        textAlign: "right",
                        fontFamily: "Istok Web",
                        fontWeight: "400",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="body2"
                        style={{
                          textAlign: isSmallScreen ? "left" : "right",
                          marginLeft: isSmallScreen ? "auto" : "unset",
                        }}
                      >
                        Reward {taskData.reward} USD
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>

              <Box flexDirection={"column"} height={"282px"} width={"432px"}>
                <CardContent>
                  <Box>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        gutterBottom
                        variant="h3"
                        component="div"
                        textAlign={"left"}
                      >
                        {taskData.title}
                      </Typography>

                      <HiOutlineExternalLink
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      #8654
                    </Typography>
                  </Box>

                  <Box mt={4}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign={"right"}
                    >
                      Creator Role ID: {taskData.creatorRole}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign={"right"}
                    >
                      Authorized Role ID: [{taskData.authorizedRoles}]
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      textAlign={"right"}
                    >
                      Assignee: {taskData.assignee}
                    </Typography>
                  </Box>

                  <Box display={"flex"} justifyContent="space-between" mt={6}>
                    {taskData.status != "Completed" &&
                      taskData.status != "Canceled" && (
                        <Button
                          variant="contained"
                          component="span"
                          onClick={handleAction}
                        >
                          {action}
                        </Button>
                      )}
                    <Button
                      startIcon={<HiOutlineClock />}
                      variant="contained"
                      component="span"
                    >
                      End Date: {taskData.endDate}
                    </Button>
                  </Box>

                  {isLeader && taskData.status != "Canceled" && (
                    <Box sx={{ margin: "5px" }}>
                      <Button
                        variant="contained"
                        component="span"
                        onClick={handleCancel}
                      >
                        Cancel Task
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Box>
            </Box>
          ) : (
            console.log("Error Getting Card")
          )}
        </>
      )}
    </Grid>
  );
};
