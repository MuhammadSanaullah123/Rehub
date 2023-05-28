import { createSlice, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const AddSpaceReducer = createSlice({
  name: "AddSpaceReducer",
  initialState: {
    addspace: {},
  },

  reducers: {
    addSpaceData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { addSpaceData } = AddSpaceReducer.actions;
export default AddSpaceReducer.reducer;
