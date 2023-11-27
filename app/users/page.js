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
import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function Users() {
  const isOpen = useSelector((state) => state.sidebarReducer.isOpen);
  const elementsRef = useRef([]);
  const [isLineClampUsed, setIsLineClampUsed] = useState([]);
  const { data, isLoading } = useQuery(["list-users-data"], () =>
    getUsersData()
  );

  const usersData = useMemo(() => data?.data || [], [data]);
  const usersColumn = (usersData.length > 0 && Object.keys(usersData[0])) || [];

  console.log(elementsRef);

  // useEffect(() => {
  //   const checkLineClamp = () => {
  //     const updatedIsLineClampUsed = elementsRef.current.map((element) => {
  //       if (element.scrollHeight > element.clientHeight) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });

  //     setIsLineClampUsed(updatedIsLineClampUsed);
  //   };
  //   checkLineClamp();
  //   window.addEventListener("resize", checkLineClamp);

  //   return () => {
  //     window.removeEventListener("resize", checkLineClamp);
  //   };
  // }, [elementsRef]);

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
                usersData.map((payment, indexUser) => (
                  <TableRow key={indexUser}>
                    {usersColumn.map((column, indexCol) => (
                      <TableCell key={"col-" + indexUser + indexCol}>
                        <Box
                          display={"flex"}
                          overflow={"hidden"}
                          position={"relative"}
                          alignItems={"center"}
                        >
                          <Typography
                            sx={{
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 1,
                            }}
                            fontSize={"15px"}
                          >
                            {payment[column]}
                          </Typography>
                          {/* {isLineClampUsed[index] && (
                            <Box>
                              <IconButton>
                                <NavigateNextIcon />
                              </IconButton>
                            </Box>
                          )} */}
                        </Box>
                      </TableCell>
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
