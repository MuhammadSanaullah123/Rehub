import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import userSlice from "./features/userSlice";
import bookingSlice from "./features/bookingSlice";
import AddSpaceReducer from "./features/addSpace";

import UserReducerApis from "./redux/UserReducerApis";

const reducers = combineReducers({
  // counter: counterReducer,
  user: userSlice,
  booking: bookingSlice,
  space: AddSpaceReducer,
  userReducer: UserReducerApis,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

//  default store;
// export const store = configureStore({
//   reducer: {
//     user: userSlice,
//     booking: bookingSlice,
//   },
// });
