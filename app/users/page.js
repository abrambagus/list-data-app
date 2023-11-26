"use client";

import { getUsersData } from "@/app/_api/api";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function Users() {
  const isOpen = useSelector((state) => state.sidebarReducer.isOpen);

  const { data, isLoading } = useQuery(["list-users-data"], () =>
    getUsersData()
  );

  const usersData = data?.data || [];
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
                  <TableCell sx={{ padding: 1 }} align="center" key={item}>
                    <Typography fontSize={"15px"} align="center">
                      {item}
                    </Typography>
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
                usersData.map((payment, index) => (
                  <TableRow key={index}>
                    {usersColumn.map((column) => (
                      <TableCell key={column}>{payment[column]}</TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
