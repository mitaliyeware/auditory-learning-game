import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import appSlice from "./appSlice";
import categorySlice from "./categorySlice";
import mediaSlice from "./mediaSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    login: loginSlice,
    category: categorySlice,
    media: mediaSlice,
  },
});

export default store;
