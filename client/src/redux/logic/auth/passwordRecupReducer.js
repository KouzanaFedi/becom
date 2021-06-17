import { createSlice } from "@reduxjs/toolkit";
import { emailValidate } from "../../../utils/stringValidation";

const passwordRecupReducer = createSlice({
    name: "passwordRecup",
    initialState: {
        step: 1,
        email: {
            value: "",
            error: null,
            ready: false
        },
        codeReady: false,
        code: {
            // value: ["", "", "", "", "", "", "", "", ""],
            value: "",
            error: null,
            ready: false
        },
        password: {
            value: "",
            error: null,
            ready: false
        }
    },
    reducers: {
        SET_EMAIL_RECUP: (state, action) =>
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
        SET_CODE_READY_RECUP: (state, action) =>
        {
            state.codeReady = action.payload.isReady;
            if (!action.payload.isReady) {
                state.code = {
                    value: "",
                    error: null,
                    ready: false
                }
            }
        },
        SET_CODE_RECUP: (state, action) =>
        {
            if (action.payload.code.length <= 9) {
                state.code.value = action.payload.code;
                if (state.code.value.length === 9) {
                    state.code.error = null;
                    state.code.ready = true;
                } else {
                    state.code.ready = false;
                }
            }

        },
        SET_STEP_TWO: (state, _) =>
        {
            state.step = 2;
        },
        SET_STEP_THREE: (state, _) =>
        {
            state.step = 3;
        },
        SET_CODE_ERROR: (state, _) =>
        {
            state.code.error = "Invalide code";
        },
        SET_NEW_PASSWORD_RECUP: (state, action) =>
        {
            state.password.value = action.payload.password.toString();
            if (state.password.value.length < 6) {
                if (state.password.value.length === 0)
                    state.password.error = "Obligatory field";
                else state.password.error = "Minimum 6 characters";
            } else state.password.error = null;
            state.password.ready = state.password.error === null;
        },
        SET_NEW_PASSWORD_ERROR: (state, _) =>
        {
            state.password.error = "Error occured retry!";
            state.password.ready = state.password.error === null;
        },
        RESET_RECUP: (state, _) =>
        {
            state.step = 1;
            const res = {
                value: "",
                error: null,
                ready: false
            }
            state.email = res;
            state.password = res;
            state.code = res;
        }

    },
})

export const { SET_EMAIL_RECUP, SET_CODE_READY_RECUP, SET_CODE_RECUP, SET_STEP_TWO, SET_CODE_ERROR, SET_NEW_PASSWORD_RECUP, SET_STEP_THREE, SET_NEW_PASSWORD_ERROR, RESET_RECUP } = passwordRecupReducer.actions;

export const recupEmail = (state) => state.passwordRecup.email;
export const recupStep = (state) => state.passwordRecup.step;
export const recupCode = (state) => state.passwordRecup.code;
export const canRecupCode = (state) => state.passwordRecup.codeReady;
export const passwordCode = (state) => state.passwordRecup.password;

export default passwordRecupReducer.reducer;