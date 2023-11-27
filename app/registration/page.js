"use client";

import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postUsersData } from "../_api/api";

export default function Registration() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { name: "", email: "" } });

  const mutation = useMutation(
    (newTodo) => {
      return postUsersData(newTodo);
    },
    {
      onSuccess: (data) => {
        if (data.status === 200) {
          setIsSuccess(true);
          setAlertMessage("User Created");
        } else {
          setIsSuccess(false);
          setAlertMessage("Email already exists");
        }
      },
    }
  );

  const handleSubmitUser = (data, event) => {
    reset();
    mutation.mutate(data);
  };

  const handleClose = () => {
    setAlertMessage(null);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitUser)}>
      <Box sx={{ borderBottom: "1px solid" }}>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            User Registration
          </Typography>
          <Typography fontSize={"15px"} color={"blue"}>
            Add new user
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2} padding={2} width={"20%"}>
        <Box>
          <Typography fontSize={"15px"} gutterBottom>
            Name
          </Typography>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please provide name" }}
            render={({ field, fieldState }) => {
              return (
                <TextField
                  placeholder={"Input name"}
                  error={fieldState?.error}
                  sx={{ width: "100%" }}
                  variant={"outlined"}
                  size={"small"}
                  {...field}
                />
              );
            }}
          />
          {errors.name && (
            <Typography sx={{ color: "red" }}>{errors.name.message}</Typography>
          )}
        </Box>

        <Box marginTop={3}>
          <Typography fontSize={"15px"} gutterBottom>
            Email
          </Typography>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please provide email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format",
              },
            }}
            defaultValue=""
            render={({ field, fieldState }) => {
              return (
                <TextField
                  placeholder={"Input email"}
                  error={fieldState?.error}
                  sx={{
                    width: "100%",
                  }}
                  variant={"outlined"}
                  size={"small"}
                  {...field}
                />
              );
            }}
          />
          {errors.email && (
            <Typography sx={{ color: "red" }}>
              {errors.email.message}
            </Typography>
          )}
        </Box>
        <Box marginTop={3} display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" type="submit">
            Submit User
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={alertMessage}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </form>
  );
}
