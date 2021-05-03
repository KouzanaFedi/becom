import { createSlice } from "@reduxjs/toolkit";
import { emailValidate } from "../../../utils/stringValidation";

const logInReducer = createSlice({
  name: "logIn",
  initialState: {
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
    canSubmit: false
  },
  reducers: {
    SET_EMAIL_LOGIN: (state, action) =>
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
    SET_PASSWORD_LOGIN: (state, action) =>
    {
      state.password.value = action.payload.password.toString();
      if (state.password.value.length === 0)
        state.password.error = "Obligatory field";
      else state.password.error = null;
      state.password.ready = state.password.error === null;
    },
    SET_PASSWORD_ERROR_LOGIN: (state, _) =>
    {
      state.password.error = "Invalide email or password";
      state.password.ready = false;
    },
    RESET_LOGIN: (state, _) =>
    {
      const resetItem = { value: "", error: null, ready: false };
      state.email = resetItem;
      state.password = resetItem;
    }
  },
});

export const { SET_EMAIL_LOGIN, SET_PASSWORD_LOGIN, SET_PASSWORD_ERROR_LOGIN, RESET_LOGIN } = logInReducer.actions;

export const logInEmail = (state) => state.logIn.email;
export const logInPassword = (state) => state.logIn.password;
export const logInCanSubmit = (state) => state.logIn.email.ready && state.logIn.password.ready;

export default logInReducer.reducer;
