import { createSlice } from "@reduxjs/toolkit";

const projectsUiSlice = createSlice({
    name: 'projectUi',
    initialState: {},
    reducers: {}
});

export default projectsUiSlice.reducer;

// export const { } = projectsUiSlice.actions;

export const projectUiData = (state) => state.projectsUi;