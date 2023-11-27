import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen:
      localStorage.getItem("isOpen") !== null
        ? localStorage.getItem("isOpen")
        : "true",
  },
  reducers: {
    setOpenDrawer: (state) => {
      state.isOpen === "true"
        ? (state.isOpen = "false")
        : (state.isOpen = "true");
      localStorage?.setItem("isOpen", state.isOpen);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenDrawer } = sidebarSlice.actions;

export default sidebarSlice.reducer;
