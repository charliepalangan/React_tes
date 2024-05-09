import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
    Produk: [],
};

const cartProdukSlice = createSlice({
    name: "cartProduk",
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
            // action.payload should contain the Id of the item to be removed
            const itemIdToRemove = action.payload;

            // Filter the state.Produk array to remove the item with the specified Id
            state.Produk = state.Produk.filter((item) => item.Id !== itemIdToRemove);
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

export const { setProduk, resetProduk, editJumlahProduk, removeProduk } = cartProdukSlice.actions;
export default cartProdukSlice.reducer;
