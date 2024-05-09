import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    item : {},
   isOpen : false,
    Key : ''
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.isOpen = action.payload;
        },
        setItems: (state, action) => {
            state.item = action.payload;
        },
        setModalKey: (state, action) => {
            state.Key = action.payload;
        }
    },
});

export const {setModal, setItems, setModalKey} = modalSlice.actions;
export default modalSlice.reducer;
