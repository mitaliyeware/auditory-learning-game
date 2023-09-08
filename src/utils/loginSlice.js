import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userDetails: [],
  },
  reducers: {
    addUserDetails: (state, action) => {
      state.userDetails.push(action.payload);
    },
    clearUserDetails: (state) => {
      state.userDetails = [];
    },
  },
});

export default loginSlice.reducer;
export const { addUserDetails, clearUserDetails } = loginSlice.actions;
export const selectUser = (state) => state.login;
