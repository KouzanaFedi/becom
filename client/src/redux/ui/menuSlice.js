import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        activeTab: null
    },
    reducers: {
        SET_ACTIVE_TAB: (state, action) =>
        {
            state.activeTab = action.payload.name;
        },
        UNSET_ACTIVE_TAB: (state, _) =>
        {
            state.activeTab = null;
        }
    }
});

export const { SET_ACTIVE_TAB, UNSET_ACTIVE_TAB } = menuSlice.actions;

export const menuActiveTab = (state) => state.menu.activeTab;

export default menuSlice.reducer;