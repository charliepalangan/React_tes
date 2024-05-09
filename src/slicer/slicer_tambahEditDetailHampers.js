import { createSlice } from '@reduxjs/toolkit';
import { set } from 'react-hook-form';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    item: {},
    isOpen: false,
    isEdit:false,
};

const tambahEditDetailHampers = createSlice({
    name: 'tambahEditDetailHampers',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setItem: (state, action) => {
            state.item = action.payload;
        },
        resetState: (state, action) => {
            state.item = {};
            state.isOpen = false;
            state.isEdit = false;
        },
        setEdit: (state, action) => {
            state.isEdit = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            return state;
        });
    }
});

export const { setOpen, setItem, resetState, setEdit } = tambahEditDetailHampers.actions;

export default tambahEditDetailHampers.reducer;
