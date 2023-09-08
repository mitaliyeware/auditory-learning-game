import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamePath: "",
};
const gameSelectSlice = createSlice({
  name: "gamePath",
  initialState,
  reducers: {
    setGamePath: (state, action) => action.payload,
    clearGamePath: () => "",
  },
});

export const { setGamePath, clearGamePath } = gameSelectSlice.actions;

export default gameSelectSlice.reducer;
