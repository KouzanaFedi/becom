import { createSlice } from "@reduxjs/toolkit";
import { emailValidate } from "../../utils/stringValidation";

const registerReducer = createSlice({
    name: 'register',
    initialState: {
        name: {
            value: "",
            error: null,
            ready: false,
        },
        email: {
            value: "",
            error: null,
            ready: false,
        },
        password: {
            value: "",
            error: null,
            ready: false,
        },
        confirmePassword: {
            value: "",
            error: null,
            ready: false,
        },
        canSubmit: false
    },

    reducers: {
        SET_NAME_REGISTER: (state, action) =>
        {
            state.name.value = action.payload.name.toString().trim();
            if (state.name.value.length < 4) {
                if (state.name.value.length === 0)
                    state.name.error = "Obligatory field";
                else state.name.error = "Minimum 4 characters";
            } else state.name.error = null;
            state.name.ready =
                state.name.value.length > 0 && state.name.error === null;
        },
        SET_EMAIL_REGISTER: (state, action) =>
        {
            state.email.value = action.payload.email.toString().trim().toLowerCase();
            if (!emailValidate(state.email.value)) {
                if (state.email.value.length === 0)
                    state.email.error = "Obligatory field";
                else state.email.error = "Invalide email format";
            } else state.email.error = null;
            state.email.ready =
                emailValidate(state.email.value) && state.email.error === null;
        },
        SET_PASSWORD_REGISTER: (state, action) =>
        {
            state.password.value = action.payload.password.toString();
            if (state.password.value.length < 6) {
                if (state.password.value.length === 0)
                    state.password.error = "Obligatory field";
                else state.password.error = "Minimum 6 characters";
            } else state.password.error = null;
            state.password.ready =
                state.password.value.length > 0 && state.password.error === null;
            if (state.confirmePassword.value.length > 0) {
                if (state.password.value !== state.confirmePassword.value) {
                    state.confirmePassword.error = "Password not matching";
                } else state.confirmePassword.error = null;
            }
        },
        SET_CONFIRME_PASSWORD_REGISTER: (state, action) =>
        {
            state.confirmePassword.value = action.payload.confirmePassword.toString().trim();
            if (state.confirmePassword.value !== state.password.value) {
                if (state.confirmePassword.value.length === 0)
                    state.confirmePassword.error = "Obligatory field";
                else state.confirmePassword.error = "Password not matching";
            } else state.confirmePassword.error = null;
            state.confirmePassword.ready =
                state.confirmePassword.value === state.password.value && state.confirmePassword.error === null;
        },
        UPDATE_FIELDS_WHEN_EMAIL_EXISTS_REGISTER: (state, _) =>
        {
            state.password.value = "";
            state.password.error = null;

            state.confirmePassword.value = "";
            state.confirmePassword.error = null;

            state.email.error = "Email already used."
        },
        RESET_REGISTER: (state, _) =>
        {
            const resetItem = { value: "", error: null, ready: false };
            state.name = resetItem;
            state.email = resetItem;
            state.password = resetItem;
            state.confirmePassword = resetItem;
        }
    }
})

export const { SET_NAME_REGISTER, SET_EMAIL_REGISTER, SET_PASSWORD_REGISTER, SET_CONFIRME_PASSWORD_REGISTER, UPDATE_FIELDS_WHEN_EMAIL_EXISTS_REGISTER, RESET_REGISTER } = registerReducer.actions;

export const registerName = (state) => state.register.name;
export const registerEmail = (state) => state.register.email;
export const registerPassword = (state) => state.register.password;
export const registerConfirmePassword = (state) => state.register.confirmePassword;
export const registerCanSubmit = (state) => state.register.name.ready && state.register.email.ready && state.register.password.ready && state.register.confirmePassword.ready;

export default registerReducer.reducer;