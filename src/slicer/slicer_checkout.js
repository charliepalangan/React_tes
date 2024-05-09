import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
    Produk: [],
};

const CheckoutSlice = createSlice({
    name: "Checkout",
    initialState,
    reducers: {
        setProduk: (state, action) => {
            if (Array.isArray(state.Produk)) {

                state.Produk.push(action.payload);
            } else {

                state.Produk = [action.payload];
            }
        },
        resetProduk: (state) => {
            state.Produk = [];
        },
        editJumlahProduk: (state, action) => {
            const index = state.Produk.findIndex((item) => item.Id == action.payload.Id);
            state.Produk[index].Jumlah = action.payload.Jumlah;
        },
        removeProduk: (state, action) => {
            // action.payload should contain the index of the item to be removed
            const indexToRemove = action.payload;

            // Ensure the index is within bounds
            if (indexToRemove >= 0 && indexToRemove < state.Produk.length) {
                // Use the splice method to remove the item at the specified index
                state.Produk.splice(indexToRemove, 1);
            }
        },
        sortProduk: (state) => {
            state.Produk.sort((a, b) => {
                const dateA = new Date(a.Tanggal_Pengiriman);
                const dateB = new Date(b.Tanggal_Pengiriman);

                return dateA - dateB;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state, action) => {
            if (action.payload && action.payload.Produk !== undefined) {
                if (Array.isArray(action.payload.Produk)) {
                    state.Produk = action.payload.Produk;
                } else {
                    state.Produk = [];
                }
            } else {
                state.Produk = [];
            }
        });
    },
});


export const { setProduk, resetProduk, editJumlahProduk, removeProduk, sortProduk } = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
