"use client";

import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../_features/sidebarSlice";

export default configureStore({
  reducer: {
    sidebarReducer,
  },
});
