import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: "true",
  },
  reducers: {
    setOpenDrawer: (state) => {
      state.isOpen === "true"
        ? (state.isOpen = "false")
        : (state.isOpen = "true");
      localStorage.setItem("isOpen", state.isOpen);
    },
    setDefaultValue: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenDrawer, setDefaultValue } = sidebarSlice.actions;

export default sidebarSlice.reducer;
