import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";
const initialState = {
  flights: [],
  isLoading: false,
  isError: false,
  path: [],
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload.map((i) => [i.lat, i.lng]);
    },
    clearPath: (state) => {
      state.path = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFlights.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFlights.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.flights = action.payload;
    });
    builder.addCase(getFlights.rejected, (state, action) => {
      console.log("İstek başarısız:", action.error);
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export const { setPath, clearPath } = flightSlice.actions;

export default flightSlice.reducer;
