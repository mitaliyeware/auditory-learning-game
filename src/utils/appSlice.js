import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isHomePageVisible: true,
  },
  reducers: {
    showHomePage: (state) => {
      state.isHomePageVisible = true;
    },
    hideHomePage: (state) => {
      state.isHomePageVisible = false;
    },
  },
});

export default appSlice.reducer;
export const { showHomePage, hideHomePage } = appSlice.actions;
