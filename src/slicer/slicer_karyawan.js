import {createSlice} from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
const initialState = {
};

const karyawanSlice = createSlice({
  name: 'karyawan',
  initialState,
  reducers: {
    setKaryawan: (state, action) => {
      state.karyawan = action.payload;
    },
    logoutKaryawan: (state) => {
      state.karyawan = null;
    },
  },
  extraReducers : (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      return state;
    });
  }
});

export const {setKaryawan, logoutKaryawan} = karyawanSlice.actions;

export default karyawanSlice.reducer;
