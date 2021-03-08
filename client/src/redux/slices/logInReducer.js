import { createSlice } from "@reduxjs/toolkit";

const logInReducer = createSlice({
  name: "logIn",
  initialState: {
    name: {
      value: "",
      error: null,
      ready: false,
    },
    password: {
      value: "",
      error: null,
      ready: false,
    },
  },
  reducers: {
    setName: (state, action) => {
      state.name.value = action.payload.name;
      if (state.name.value.toString().length < 4) {
        if (state.name.value.toString().length === 0)
          state.name.error = "Obligatory field";
        else state.name.error = "Minimum 4 characters";
      } else state.name.error = null;
      state.name.ready =
        state.name.value.toString().length > 0 && state.name.error === null;
    },
    setPassword: (state, action) => {
      state.password.value = action.payload.password;
      if (state.password.value.toString().length < 6) {
        if (state.password.value.toString().length === 0)
          state.password.error = "Obligatory field";
        else state.password.error = "Minimum 6 characters";
      } else state.password.error = null;
      state.password.ready =
        state.password.value.toString().length > 0 &&
        state.password.error === null;
    },
  },
});

export const { setName, setPassword } = logInReducer.actions;

export const logInName = (state) => state.logIn.name;
export const logInPassword = (state) => state.logIn.password;

export default logInReducer.reducer;
