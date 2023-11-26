"use client";
import { getPaymentData } from "@/app/_api/api";
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

const salesHeader = [
  "id",
  "name",
  "sales_id",
  "item_id",
  "qty",
  "consumen_nama",
  "transaction_date",
];

export default function Dashboard() {
  const { data, isLoading } = useQuery(["list-payment-data"], () =>
    getPaymentData()
  );

  const paymentData = data?.data || [];

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
                {salesHeader.map((item) => (
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
                  <TableCell colSpan={7}>
                    <Box mt={3} mb={3} display={"flex"} justifyContent="center">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                paymentData.map((payment, index) => (
                  <RenderTablePayment key={index} data={payment} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

const RenderTablePayment = ({ data }) => {
  return (
    <TableRow>
      <TableCell>
        <Typography>{data.id}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{data.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{data.sales_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{data.item_id}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{data.qty}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{data.consumen_name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{data.transaction_date}</Typography>
      </TableCell>
    </TableRow>
  );
};
