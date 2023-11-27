"use client";
import { getPaymentData } from "@/app/_api/api";
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
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

export default function Dashboard() {
  const { data, isLoading } = useQuery(["list-payment-data"], () =>
    getPaymentData()
  );

  const paymentData = data?.data || [];
  const paymentColumn =
    (paymentData.length > 0 && Object.keys(paymentData[0])) || [];

  return (
    <div>
      <Box sx={{ borderBottom: "1px solid" }}>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Sales Dashboard
          </Typography>
          <Typography fontSize={"15px"} color={"blue"}>
            List of Sales Data
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2} padding={2}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "calc(100vh - 140px)",
            overflow: "auto",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {paymentColumn.map((item) => (
                  <TableCell sx={{ padding: 1 }} align="center" key={item}>
                    <Typography fontSize={"15px"}>{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box mt={3} mb={3} display={"flex"} justifyContent="center">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paymentData.map((payment, index) => (
                  <RenderTablePayment
                    key={index}
                    payment={payment}
                    paymentColumn={paymentColumn}
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

const RenderTablePayment = ({ payment, paymentColumn }) => {
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
      {paymentColumn.map((column, index) => (
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
              {payment[column]}
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
                  <Typography sx={{ p: 2 }}>{payment[column]}</Typography>
                </Popover>
              </Box>
            )}
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );
};
