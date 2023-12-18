"use client";

import * as yup from "yup"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import dayjs, { isDayjs } from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { Address, zeroAddress } from "viem";

import CoverCreateTask from "@/components/02-molecules/CoverCreateTask";
import { useTaskService } from "@/services/tasks-service";
import { Task } from "@/models/task";
import { createTaskSchema } from "@/lib/schemas/createTaskSchema";

type FormData = yup.InferType<typeof createTaskSchema>;

interface CreateTaskProps {
  task?: Task;
}

export const CreateTask = ({ task }: CreateTaskProps) => {
  const form = useForm({
    resolver: yupResolver(createTaskSchema),
    defaultValues: {
      authorizedRoles: task?.authorizedRoles.toString(),
      creatorRole: task?.creatorRole.toString(),
      title: task?.title,
      reward: task?.reward.toString(),
      assignee: task?.assignee,
      description: task?.description,
      endDate: task?.endDate ? dayjs.unix(Number(task.endDate)) : dayjs().add(1, 'day'),
      metadata: task?.metadata,
    },
  });
  const { createTask } = useTaskService();

  const onSubmit = async (values: FormData) => {
    try {
      toast.info("Create Task Start process initiated with success");

      const endDate = isDayjs(values.endDate) ? values.endDate : dayjs(values.endDate as Date)

      await toast.promise(createTask({
        title: values.title,
        description: values.description,
        assignee: values.assignee ? values.assignee as Address : zeroAddress,
        authorizedRoles: values.authorizedRoles.split(",").map(BigInt),
        creatorRole: BigInt(values.creatorRole),
        metadata: values.metadata,
        reward: BigInt(values.reward),
        status: 0,
        endDate: BigInt(endDate.unix()),
      }), {
        pending: "Creating task...",
        success: "Task created with success",
      })
    } catch (error) {
      let message = 'Unexpected error';
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(`Error creating task! Error: ${message}`);
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
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

        <Box
          marginTop={2}
          component="form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Stack spacing={2} alignItems={"center"}>
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <TextField
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                  label="Title"
                  placeholder="Describe the activity or link to a document"
                  fullWidth
                />
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <TextField
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                  label="Description"
                  placeholder="A full description about the activity."
                  maxRows="18"
                  multiline
                  fullWidth
                />
              )}
            />

            <Controller
              control={form.control}
              name="authorizedRoles"
              render={({ field, fieldState }) => (
                <TextField
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : "Separate by `,`"
                  }
                  label="Authorized Roles"
                  placeholder="The authorized roles to perform the task"
                  fullWidth
                />
              )}
            />

            <Controller
              control={form.control}
              name="creatorRole"
              render={({ field, fieldState }) => (
                <TextField
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                  label="Creator Role"
                  placeholder="Creator Role 5..10.."
                  fullWidth
                />
              )}
            />

            <Controller
              control={form.control}
              name="assignee"
              render={({ field, fieldState }) => (
                <TextField
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error
                      ? fieldState.error.message
                      : "Leave blank to allow anyone to perform the task"
                  }
                  label="Assignee Address"
                  placeholder="Assignee address"
                  fullWidth
                />
              )}
            />

            <Controller
              control={form.control}
              name="metadata"
              render={({ field, fieldState }) => (
                <TextField
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error ? fieldState.error.message : null
                  }
                  label="Metadata (IPFS)"
                  placeholder="https://ipfs.io/ipfs/QmY5D...7CEh"
                  fullWidth
                />
              )}
            />

            <Stack
              spacing={2}
              direction={"row"}
              alignItems="center"
              justifyContent="center"
            >
                <Controller
                  control={form.control}
                  name="reward"
                  render={({ field, fieldState }) => (
                    <TextField
                      onChange={field.onChange}
                      value={field.value}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                      label="Reward in USD"
                      type="number"
                      inputProps={{
                        inputMode: "decimal"
                      }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                      }}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  control={form.control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <DatePicker
                      onChange={field.onChange}
                      value={field.value || dayjs().add(1, 'day')}
                      label="Deliver Date"
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          error: !!fieldState.error,
                          helperText: fieldState.error
                            ? fieldState.error.message
                            : null,
                          fullWidth: true,
                        },
                      }}
                    />
                  )}
                />
            </Stack>

            <LoadingButton
              type="submit"
              variant="outlined"
              loading={form.formState.isSubmitting}
            >
              Create
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};
