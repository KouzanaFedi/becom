import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: {
            name: null,
            id: null,
            email: null,
            image: null,
            token: null,
            createdAt: null,
        },
        userInit: false
    },
    reducers: {
        INIT_USER_DATA: (state, action) =>
        {
            const { name, id, email, image, token, createdAt } = action.payload;
            const data = { name, id, image, email, token, createdAt };
            state.data = data;
            state.userInit = true;
        },
        SET_PROFILE_IMG: (state, action) =>
        {
            state.data.image = action.payload;
        }
    }
});

export const { INIT_USER_DATA, SET_PROFILE_IMG } = userSlice.actions;

export const userData = (state) => state.user.data;
export const userID = (state) => state.user.data.id;
export const userDataInit = (state) => state.user.userInit;

export default userSlice.reducer;