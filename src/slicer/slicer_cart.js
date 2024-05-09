import {createSlice} from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
const initialState = {
    isOpen : false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsOpen : (state, action) => {
      state.isOpen = action.payload;
    },
  },
  extraReducers : (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      return state;
    });
  }
});

export const {setIsOpen} = cartSlice.actions;

export default cartSlice.reducer;
