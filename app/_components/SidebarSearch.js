import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { deleteUser } from "../_api/api";

const SidebarSearch = ({ user, handleCloseSidebar, handleReset }) => {
  const userKey = (user && Object.keys(user)) || [];
  const [alertMessage, setAlertMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation(
    (newTodo) => {
      return deleteUser(newTodo);
    },
    {
      onSuccess: async (data) => {
        const response = await data.json();
        if (data.status === 200) {
          setIsSuccess(true);
          setAlertMessage("User Deleted");
          handleCloseSidebar();
          handleReset();
        } else {
          setIsSuccess(false);
          setAlertMessage(response.message);
        }
      },
    }
  );

  const handleDeleteUser = () => {
    mutation.mutate(user.id);
  };

  const handleCloseSnackbar = () => {
    setAlertMessage(null);
  };

  return (
    <Stack sx={{ width: 500, padding: 2 }} spacing={2}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h4" fontWeight={600}>
            User Details
          </Typography>
          <Typography fontSize={"15px"}>
            This is inquiry about user with email: {user?.email}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleCloseSidebar}>
            <CloseIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
        </Box>
      </Box>
      <Stack
        height={580}
        borderTop={"1px solid grey"}
        borderBottom={"1px solid grey"}
        overflow={"auto"}
      >
        {userKey.map((key, index) => (
          <Grid container display={"flex"} key={index}>
            <Grid item xs={4}>
              <Typography fontSize={"15px"}>{key}</Typography>
            </Grid>
            <Grid item xs={0.5}>
              <Typography fontSize={"15px"}>:</Typography>
            </Grid>
            <Grid item xs={7.5}>
              <Typography fontSize={"15px"} sx={{ wordWrap: "break-word" }}>
                {user[key]}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Stack>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button onClick={handleCloseSidebar} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDeleteUser} color="error" variant="contained">
          Delete User
        </Button>
      </Box>
      <Snackbar
        open={alertMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SidebarSearch;
