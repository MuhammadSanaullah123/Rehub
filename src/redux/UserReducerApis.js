import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import axios from "axios";

import Cookies from "universal-cookie";
import { baseURL } from "../common/AxiosInstance";

const cookies = new Cookies();

const initialState = {
  // currentUser: null || setCurrentUserFromToken(cookies.get(localToken)),
  getApiContentData: null,
};

//getContentApi
export const getContentApi = createAsyncThunk("getContentApi", async () => {
  try {
    const response = await axios.get(`${baseURL}/content/find`);
    return response.data;
  } catch (err) {}
});

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [getContentApi.fulfilled]: (state, action) => {
      state.getApiContentData = action.payload;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["getAllDesigners"],
};

const user = userReducer.reducer;
const FilterUser = userReducer.reducer;

// Action creators are generated for each case reducer function
export const { setCurrentUser } = userReducer.actions;
export default persistReducer(persistConfig, user, FilterUser);
