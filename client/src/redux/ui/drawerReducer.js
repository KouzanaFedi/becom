import { createSlice } from "@reduxjs/toolkit";

const drawerReducer = createSlice({
    name: 'drawerReducer',
    initialState: {
        drawer: {
            open: false,
            pinned: false
        },
        activeTab: null,
        calendarRef: null
    },
    reducers: {
        OPEN_DRAWER: (state, _) =>
        {
            if (!state.drawer.open && !state.drawer.pinned) {
                state.drawer.open = true;
            }
        },
        CLOSE_DRAWER: (state, _) =>
        {
            if (state.drawer.open && !state.drawer.pinned) {
                state.drawer.open = false;
            }
        },
        PIN_DRAWER: (state, _) =>
        {
            if (!state.drawer.pinned) {
                state.drawer.pinned = true;
            }
        },
        UNPIN_DRAWER: (state, _) =>
        {
            if (state.drawer.pinned) {
                state.drawer.pinned = false;
            }
        },
        SET_ACTIVE_TAB: (state, action) =>
        {
            if (state.activeTab !== action.payload.tab) {
                state.activeTab = action.payload.tab;
            }
        },
        INIT_CALENDAR_REF: (state, action) =>
        {
            state.calendarRef = action.payload.ref;
        }
    }
});

export const { OPEN_DRAWER, CLOSE_DRAWER, PIN_DRAWER, UNPIN_DRAWER, SET_ACTIVE_TAB, INIT_CALENDAR_REF } = drawerReducer.actions;

export const uiDrawerState = (state) => state.drawerReducer.drawer;
export const uiDrawerActiveTabState = (state) => state.drawerReducer.activeTab;
export const uiCalendarRef = (state) => state.drawerReducer.calendarRef;

export default drawerReducer.reducer;