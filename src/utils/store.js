import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import appSlice from "./appSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    login: loginSlice,
  },
});

export default store;
