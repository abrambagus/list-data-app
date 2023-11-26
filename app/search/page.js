"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUsersData } from "../_api/api";

export default function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const { data } = useQuery(["list-users-data-search"], () => getUsersData());
  const usersData = data?.data || [];

  const handleSearch = (event) => {
    console.log(search);
    if (event.key === "Enter") {
      setResult(usersData.find((data) => data.email === search));
    }
  };

  console.log("result", result);

  return (
    <div>
      <Box sx={{ borderBottom: "1px solid" }}>
        <Box sx={{ padding: 1 }}>
          <Typography variant="h4" fontWeight={600}>
            Search User
          </Typography>
          <Typography fontSize={"15px"} color={"blue"}>
            Search existing user
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2} padding={2} width={"70%"}>
        <TextField
          placeholder={"Press enter to search user"}
          sx={{
            width: "100%",
          }}
          variant={"outlined"}
          size={"small"}
          value={search}
          onKeyDown={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        {result && (
          <Box
            width={"100%"}
            border={"1px solid"}
            borderRadius={2}
            marginTop={4}
            paddingY={4}
          >
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Typography variant="h4" fontWeight={600}>
                {result.name}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Typography fontSize={"15px"} fontWeight={100} color={"gray"}>
                {result.email}
              </Typography>
            </Box>
            <Box border={"1px solid grey"} marginX={30} marginBottom={1} />
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Button variant="contained" type="submit">
                View User Profile
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <SwipeableDrawer
        anchor={"right"}
        open={false}
        onClose={null}
        onOpen={null}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton></ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List></List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
}
