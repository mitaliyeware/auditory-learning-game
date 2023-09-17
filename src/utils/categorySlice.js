import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "",
  category: "",
  game: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.category = action.payload;
    },
    selectMode: (state, action) => {
      state.mode = action.payload;
      state.category = "";
      state.game = "";
    },
    selectGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { selectCategory, selectMode, selectGame } = categorySlice.actions;

export default categorySlice.reducer;
