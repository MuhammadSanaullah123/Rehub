import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredArray: null,
  singleSpaceSelect: null,
  bookingDataAdmin: null,
  filteredArrayBookingList: null,
  singleReciptData: null,
  userCurrentSlotsSelected: null,
  bookingdata: null,
  reviewArrayOnlyModel: null,
  updatePickDate: null,
  bookingListDashboard: null,
  locationFilter: null,
  upcomingBooking: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setFilterSpace: (state, action) => {
      // state.value = action.payload;
      state.filteredArray = action.payload;
    },

    setupcomingBooking: (state, action) => {
      state.upcomingBooking = action.payload;
    },
    setSingleSpaceData: (state, action) => {
      // state.singleSpaceSelect = action.payload;
      state.singleSpaceSelect = action.payload;
    },

    setBookingDataAdmin: (state, action) => {
      // state.value = action.payload;
      state.bookingDataAdmin = action.payload;
    },

    setFilteredBookingListCenter: (state, action) => {
      // state.value = action.payload;
      state.filteredArrayBookingList = action.payload;
    },

    setReciptData: (state, action) => {
      // state.value = action.payload;
      state.singleReciptData = action.payload;
    },
    // setGoogleTokenForRegister: (state, action) => {
    //   state.googleTokenId = action.payload;
    // },

    setUserCurrentSelect: (state, action) => {
      // state.value = action.payload;
      state.userCurrentSlotsSelected = action.payload;
    },
    setBookingDataInbooking: (state, action) => {
      // state.value = action.payload;
      state.bookingdata = action.payload;
    },
    setUpdatedPickedDate: (state, action) => {
      // state.value = action.payload;
      state.updatePickDate = action.payload;
    },
    setBookingListDashboard: (state, action) => {
      // state.value = action.payload;
      state.bookingListDashboard = action.payload;
    },

    setOnlyBookingArrayforreviewModel: (state, action) => {
      // state.value = action.payload;
      state.reviewArrayOnlyModel = action.payload;
    },
  },
});
export const {
  setFilteredBookingListCenter,
  setReciptData,
  setFilterSpace,
  setSingleSpaceData,
  setBookingDataAdmin,
  setUserCurrentSelect,
  setBookingDataInbooking,
  setUpdatedPickedDate,
  setOnlyBookingArrayforreviewModel,
  setupcomingBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
