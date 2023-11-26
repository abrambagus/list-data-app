import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isOpen: true,
  },
  reducers: {
    setOpenDrawer: (state) => {
      state.isOpen = !state.isOpen
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOpenDrawer } = sidebarSlice.actions

export default sidebarSlice.reducer