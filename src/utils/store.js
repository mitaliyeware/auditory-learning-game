import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import appSlice from "./appSlice";
import categorySlice from "./categorySlice";
import mediaSlice from "./mediaSlice";
import gameSelectSlice from "./gameSelectSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
    login: loginSlice,
    category: categorySlice,
    gamePath: gameSelectSlice,
    // media: mediaSlice,
  },
});

export default store;
