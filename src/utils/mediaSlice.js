import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  media: "",
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    objectName: (state, action) => {
      state.objectName = action.payload;
    },
  },
});

export const { objectName } = mediaSlice.actions;

export const selectObjectName = (state) => state.media.objectName;

export default mediaSlice.reducer;
