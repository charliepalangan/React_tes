import {createSlice} from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
const initialState = {
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.karyawan = action.payload;
    },
    logoutCustomer: (state) => {
      state.karyawan = null;
    },
  },
  extraReducers : (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      return state;
    });
  }
});

export const {setCustomer, logoutCustomer} = customerSlice.actions;

export default customerSlice.reducer;
