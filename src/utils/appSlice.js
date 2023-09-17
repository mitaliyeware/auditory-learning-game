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
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
  },
});

export default appSlice.reducer;
export const { showHomePage, hideHomePage, toggleMenu, closeMenu, openMenu } =
  appSlice.actions;
