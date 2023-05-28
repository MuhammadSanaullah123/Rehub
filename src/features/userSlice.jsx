import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: null, googleTokenId: null, userImage: [] };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthorizedUser: (state, action) => {
      state.value = action.payload;
    },
    setGoogleTokenForRegister: (state, action) => {
      state.googleTokenId = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
  },
});

export const { setAuthorizedUser, setGoogleTokenForRegister, setUserImage } = userSlice.actions;

export default userSlice.reducer;
