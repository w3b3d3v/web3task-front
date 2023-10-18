import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AlertColor } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Dayjs } from "dayjs";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { useTaskService } from "src/services/tasks-service";
import { Task } from "src/models/task";
import SuspenseLoader from "src/components/SuspenseLoader";
import CoverCreateTask from "../../../../components/Cover/CoverCreateTask";
import { useSnackBar } from "src/contexts/SnackBarContext";
import { Helmet } from "react-helmet-async";
import { BigNumber, ethers } from "ethers";
import dayjs from "dayjs";
import { DateValidationError } from "@mui/x-date-pickers/models";

let newTask: Task = {
  status: 0,
  title: "",
  description: "",
  reward: BigNumber.from("0"),
  endDate: BigInt(""),
  authorizedRoles: [BigInt("")],
  creatorRole: BigInt(""),
  assignee: "0x0000000000000000000000000000000000000000",
  metadata: "",
};

const CreateTask = ({ data }) => {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { createTask } = useTaskService();
  const [task, setTask] = useState<Task>();
  const [valueReward, setValueReward] = useState<string>();
  const [authorizedRolesStr, setAuthorizedRolesStr] = useState<string>();
  const [expireDate, setExpireDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [openError, setOpenError] = useState(false);
  const [error, setError] = React.useState<DateValidationError | null>(null);
  const { showSnackBar } = useSnackBar();
  const handleSnackbar = (message: string, color: AlertColor) => {
    showSnackBar(message, color);
  };

  const schema = yup
    .object({
      title: yup.string().required("Mandatory field."),
      creatorRole: yup
        .string()
        .required("Mandatory field.")
        .test({
          test(value, ctx) {
            let role = Number(value);
            if (isNaN(role))
              return ctx.createError({ message: "Invalid number for role." });
            return true;
          },
        }),
      valueReward: yup
        .string()
        .required("Mandatory field.")
        .test({
          test(value, ctx) {
            let role = Number(value);
            if (isNaN(role))
              return ctx.createError({ message: "Invalid value." });
            return true;
          },
        }),
      authorizedRoles: yup
        .string()
        .required("Mandatory field.")
        .test({
          test(value, ctx) {
            let validation = true;
            let roles = value.split(",");
            roles.forEach((element) => {
              let role = Number(element);
              if (isNaN(role)) validation = false;
            });
            if (!validation)
              return ctx.createError({ message: "Invalid role number." });
            return validation;
          },
        }),
      assignee: yup.string().test({
        test(value, ctx) {
          if (value.length != 42 || value.slice(0, 2) != "0x")
            return ctx.createError({ message: "Invalid address." });
          return true;
        },
      }),
      metadata: yup
        .string()
        .required("Mandatory field.")
        .test({
          test(value, ctx) {
            if (value.slice(0, 4) == "ipfs" || value.slice(0, 4) == "http")
              return true;

            return ctx.createError({
              message: "Invalid metadata. Try ipfs.io/ipfs/...",
            });
          },
        }),
      description: yup
        .string()
        .required("Mandatory field.")
        .test({
          test(value, ctx) {
            if (value.length < 100)
              return ctx.createError({
                message: "Invalid description. Minimum 100 characters",
              });
            return true;
          },
        }),
      endDate: yup.string().test({
        test(value, ctx) {
          let date = Date.parse(endDate);
          if (isNaN(date)) return ctx.createError({ message: "Invalid date." });
          return true;
        },
      }),
    })
    .required();

  const currentDate = dayjs();
  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "minDate": {
        return "Select a date later than the current date";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logoImage =
    "/static/images/logo/logo-footer-" + theme.palette.mode + ".svg";

  const handleChange = (event: { target: { value: any } }) => {
    task.description = event.target.value;
  };

  const handleTitle = (event: { target: { value: any } }) => {
    task.title = event.target.value.toString();
  };

  const handleAuthorizedRoles = (event: any) => {
    setAuthorizedRolesStr(event.target.value);
  };

  const handleCreatorRole = (event: { target: { value: any } }) => {
    task.creatorRole = event.target.value;
  };

  const handleAssignee = (event: { target: { value: any } }) => {
    task.assignee =
      event.target.value == ""
        ? "0x0000000000000000000000000000000000000000"
        : event.target.value;
  };

  const handleMetadata = (event: { target: { value: any } }) => {
    task.metadata = event.target.value;
  };

  const handleDescription = (event: { target: { value: any } }) => {
    task.description = event.target.value;
  };

  const handleReward = (event: { target: { value: any } }) => {
    let reward = event.target.value;
    setValueReward(reward);
  };

  const handleExpireDate = (value: Dayjs) => {
    setExpireDate(value);
    let strEndDate = value ? value.toString() : null;
    setEndDate(strEndDate);
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    try {
      handleSnackbar(
        "Create Task Start process initiated with success!",
        "info"
      );
      let authorizedRoles: string[] = authorizedRolesStr.split(",");
      const splittedRoles: readonly bigint[] = authorizedRoles.map((str) =>
        BigInt(str)
      );
      task.authorizedRoles = splittedRoles;
      task.reward = ethers.utils.parseEther(valueReward);
      let expireTimestamp = expireDate.unix();
      task.endDate = BigInt(expireTimestamp);

      await createTask(task);
    } catch (error) {
      console.log("Error when submitting the createTask form: ", error);
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (loading && data != undefined) {
      setTask(data);
      setLoading(false);
    } else {
      if (loading) {
        setTask(newTask);
        setLoading(false);
      }
    }
  }, [setLoading]);

  return (
    <>
      <Helmet>
        <title>Web3Task - Create Task</title>
      </Helmet>
      <Box sx={{ ml: 5, width: "100%" }}>
        <Stack spacing={2}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
            flexDirection={"column"}
          >
            <Box width={"100%"}>
              <CoverCreateTask />
            </Box>
            {loading ? (
              <SuspenseLoader />
            ) : (
              <Box
                marginTop={2}
                marginRight={mdDown ? 5 : smDown ? 5 : 0}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={2} alignItems={"center"}>
                  <TextField
                    {...register("title")}
                    fullWidth
                    id="outlined-required"
                    label={"Title"}
                    onBlur={handleTitle}
                    placeholder={"Describe the activity or link to a document"}
                    helperText={errors.title?.message}
                    error={errors.title?.message != undefined}
                  />

                  <TextField
                    {...register("authorizedRoles")}
                    fullWidth
                    id="outlined-required"
                    label={"Authorized Roles (separate by `,`)"}
                    onBlur={handleAuthorizedRoles}
                    placeholder={"The authorized roles to perform the task"}
                    helperText={errors.authorizedRoles?.message}
                    error={errors.authorizedRoles?.message != undefined}
                  />

                  <TextField
                    {...register("creatorRole")}
                    fullWidth
                    id="outlined-required"
                    label={"Creator Role"}
                    onBlur={handleCreatorRole}
                    placeholder={"Creator Role 5..10.."}
                    helperText={errors.creatorRole?.message}
                    error={errors.creatorRole?.message != undefined}
                  />

                  <TextField
                    {...register("assignee")}
                    fullWidth
                    id="outlined-required"
                    label={
                      "Assignee Address (leave blank to allow anyone to perform the task)"
                    }
                    onBlur={handleAssignee}
                    placeholder={"Assignee address"}
                    helperText={errors.assignee?.message}
                    error={errors.assignee?.message != undefined}
                  />

                  <TextField
                    {...register("metadata")}
                    fullWidth
                    id="outlined-required"
                    label={"Metadata (IPFS)"}
                    onBlur={handleMetadata}
                    placeholder={"https://ipfs.io/ipfs/QmY5D...7CEh"}
                    helperText={errors.metadata?.message}
                    error={errors.metadata?.message != undefined}
                  />

                  <TextField
                    {...register("description")}
                    fullWidth
                    id="outlined-required"
                    label={"Description"}
                    onBlur={handleDescription}
                    placeholder={"A full description about the ativity."}
                    multiline
                    maxRows="18"
                    helperText={errors.description?.message}
                    error={errors.description?.message != undefined}
                  />

                  <Stack
                    spacing={2}
                    direction={"row"}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box>
                      <img
                        src={logoImage}
                        width={"100px"}
                        height={"100px"}
                        alt="Pod3LabsRecompensaIcon"
                      />
                    </Box>
                    <div>
                      <TextField
                        {...register("valueReward")}
                        label={"Reward in ETH"}
                        onBlur={handleReward}
                        helperText={errors.valueReward?.message}
                        error={errors.valueReward?.message != undefined}
                      />
                    </div>
                    <div>
                      <DatePicker
                        label={"Deliver Date"}
                        minDate={currentDate}
                        onError={(newError) => setError(newError)}
                        onChange={(newValue: Dayjs) =>
                          handleExpireDate(newValue)
                        }
                        slotProps={{
                          textField: {
                            size: "medium",
                            helperText: errorMessage,
                          },
                          openPickerIcon: {
                            style: { color: theme.palette.primary.main },
                          },
                          switchViewButton: { style: { color: "info" } },
                        }}
                      />
                      <p
                        style={{
                          margin: "0",
                          color: theme.colors.error.main,
                          fontWeight: "bold",
                        }}
                      >
                        {errors.endDate?.message}
                      </p>
                    </div>
                  </Stack>

                  <Button type="submit" variant="contained" color="primary">
                    Create
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default CreateTask;
