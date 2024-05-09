import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';
const initialState = {
    type: "",
    produk: {},
};

const CustomerViewProdukSlice = createSlice({
    name: 'customer_view_produk',
    initialState,
    reducers: {
        setType: (state, action) => {
            state.type = action.payload;
        },
        setProduk: (state, action) => {
            state.produk = action.payload;
        },
        resetStateView: (state) => {
            state.type = "";
            state.produk = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            return state;
        });
    }
});

export const { setType, setProduk, resetStateView} = CustomerViewProdukSlice.actions;

export default CustomerViewProdukSlice.reducer;

