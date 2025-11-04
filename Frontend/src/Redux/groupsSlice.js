import { createSlice } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
    name: "groups",
    initialState: {
        groups: [],
    },
    reducers: {
        setgroups: (state, action) => {
            state.groups = action.payload;
        },
    }
});

export const { setgroups } = groupsSlice.actions;

export default groupsSlice.reducer;