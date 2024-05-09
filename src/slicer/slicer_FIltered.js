import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
    isFiltered : false,
    Value : ""
};

const FilterSlice = createSlice({
    name: 'Filter',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.isFiltered = action.payload.isFiltered;
            state.Value = action.payload.Value;
        },
        resetFilter: (state) => {
            state.isFiltered = false;
            state.Value = "";
        },
        updateFilter: (state, action) => {
            state.isFiltered = action.payload.isFiltered;
            state.Value = action.payload.Value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(REHYDRATE, (state) => {
            return state;
        });
    }
});

export const { setFilter, resetFilter,updateFilter } = FilterSlice.actions;

export default FilterSlice.reducer;
