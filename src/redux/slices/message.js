import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    content: null,
    type: null
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action) => {
            state.content = action.payload.content;
            state.type = action.payload.type;
        },

        clearMessage: (state) => {
            state.content = null;
            state.type = null;
        },
    },
});

const {reducer, actions} = messageSlice;

export const {setMessage, clearMessage} = actions;
export default reducer;
