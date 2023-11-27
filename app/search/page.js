"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getUsersData } from "../_api/api";
import SidebarSearch from "../_components/SidebarSearch";

export default function Search() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const { data, refetch } = useQuery(["list-users-data-search"], () =>
    getUsersData()
  );
  const usersData = data?.data || [];

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setUser(usersData.find((data) => data.email === search));
    }
  };

  const handleReset = () => {
    setSearch("");
    setUser(null);
    refetch();
  };

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
      <Box marginTop={2} padding={2} width={"60%"}>
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
        {user && (
          <Box
            width={"100%"}
            border={"1px solid"}
            borderRadius={2}
            marginTop={4}
            paddingY={4}
          >
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Typography variant="h4" fontWeight={600}>
                {user.name}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Typography fontSize={"15px"} color={"gray"}>
                {user.email}
              </Typography>
            </Box>
            <Box border={"1px solid grey"} marginX={30} marginBottom={1} />
            <Box display={"flex"} justifyContent={"center"} marginBottom={1}>
              <Button
                variant="contained"
                type="submit"
                onClick={() => setOpenDrawer(true)}
              >
                View User Profile
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      <SwipeableDrawer
        anchor={"right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(true)}
        onOpen={() => setOpenDrawer(false)}
      >
        <SidebarSearch
          user={user}
          handleCloseSidebar={() => setOpenDrawer(false)}
          handleReset={handleReset}
        />
      </SwipeableDrawer>
    </div>
  );
}
