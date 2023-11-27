"use client";

import { getUsersData } from "@/app/_api/api";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function Users() {
  const isOpen = useSelector((state) => state.sidebarReducer.isOpen);

  const { data, isLoading } = useQuery(["list-users-data"], () =>
    getUsersData()
  );

  const usersData = useMemo(() => data?.data || [], [data]);
  const usersColumn = (usersData.length > 0 && Object.keys(usersData[0])) || [];

  return (
    <div>
      <Box sx={{ borderBottom: "1px solid" }}>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Users Data
          </Typography>
          <Typography fontSize={"15px"} color={"blue"}>
            List of Users Data
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2} padding={2}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "calc(100vh - 140px)",
            maxWidth: isOpen ? "calc(100vw - 225px)" : "calc(100vw - 100px)",
            overflow: "auto",
            transition: `max-width ${isOpen ? "0.4s" : "0.1s"}  linear`,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {usersColumn.map((item) => (
                  <TableCell
                    sx={{ padding: 1, maxWidth: "250px" }}
                    align="center"
                    key={item}
                  >
                    <Typography fontSize={"15px"}>{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={usersColumn.length}>
                    <Box mt={3} mb={3} display={"flex"} justifyContent="center">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                usersData.map((user, index) => (
                  <UserRowTable
                    key={index}
                    user={user}
                    usersColumn={usersColumn}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

const UserRowTable = ({ user, usersColumn }) => {
  const elementsRef = useRef([]);
  const [anchorEl, setAnchorEl] = useState([]);
  const [isLineClamp, setIsLineClamp] = useState([]);

  const handleClick = (event, index) => {
    const newArray = [...anchorEl];
    newArray[index] = event.currentTarget;
    setAnchorEl(newArray);
  };

  const handleClose = (index) => {
    const result = anchorEl.filter((anchor, index) => index !== index);
    setAnchorEl(result);
  };

  useEffect(() => {
    const checkLineClamp = () => {
      const updatedIsLineClamp = elementsRef.current.map((element) => {
        if (element.scrollHeight > element.clientHeight) {
          return true;
        } else {
          return false;
        }
      });

      setIsLineClamp(updatedIsLineClamp);
    };
    checkLineClamp();
    window.addEventListener("resize", checkLineClamp);

    return () => {
      window.removeEventListener("resize", checkLineClamp);
    };
  }, [elementsRef]);

  return (
    <TableRow>
      {usersColumn.map((column, index) => (
        <TableCell key={"col-" + index}>
          <Box
            display={"flex"}
            overflow={"hidden"}
            position={"relative"}
            alignItems={"center"}
          >
            <Typography
              ref={(el) => (elementsRef.current[index] = el)}
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              fontSize={"15px"}
            >
              {user[column]}
            </Typography>
            {isLineClamp[index] && (
              <Box>
                <IconButton onClick={(event) => handleClick(event, index)}>
                  <NavigateNextIcon />
                </IconButton>
                <Popover
                  id={Boolean(anchorEl[index]) ? "popover" : undefined}
                  open={Boolean(anchorEl[index])}
                  anchorEl={anchorEl[index]}
                  onClose={() => handleClose(index)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Typography sx={{ p: 2 }}>{user[column]}</Typography>
                </Popover>
              </Box>
            )}
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );
};
