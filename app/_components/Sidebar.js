"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const listSidebar = [
  { label: "Dashboard", url: "/", icon: <DashboardIcon /> },
  { label: "Users", url: "/users", icon: <GroupRoundedIcon /> },
  {
    label: "Registration",
    url: "/registration",
    icon: <PersonAddAltRoundedIcon />,
  },
  { label: "Search", url: "/search", icon: <SearchRoundedIcon /> },
];

const drawerWidth = 190;

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState("true");

  const isActive = (item) => {
    return pathName === item.url;
  };

  const handleOpenSidebar = () => {
    setIsOpen((prev) => {
      const newValue = prev === "true" ? "false" : "true";
      localStorage.setItem("isOpen", newValue);
      return newValue;
    });
  };

  useEffect(() => {
    if (localStorage.getItem("isOpen")) {
      setIsOpen(localStorage.getItem("isOpen"));
    }
  }, []);

  return (
    <StyledDrawer variant="permanent" anchor="left" open={isOpen === "true"}>
      <List>
        <ListItemButton onClick={handleOpenSidebar}>
          <ListItemIcon>
            <MenuRoundedIcon />
          </ListItemIcon>
          <ListItemText>
            <Typography>Menu</Typography>
          </ListItemText>
        </ListItemButton>
        {listSidebar.map((item, index) => {
          return (
            <ListItemButton key={index} onClick={() => router.push(item.url)}>
              <ListItemIcon>
                {React.cloneElement(item.icon, {
                  sx: { color: isActive(item) ? "blue" : "black" },
                })}
              </ListItemIcon>
              <ListItemText>
                <Typography color={isActive(item) ? "blue" : "black"}>
                  {item.label}
                </Typography>
              </ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </StyledDrawer>
  );
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default Sidebar;
