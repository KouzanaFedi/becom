import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./auth/logInReducer";
import registerReducer from "./auth/registerReducer";
import passwordRecupReducer from "./auth/passwordRecupReducer";

export default configureStore({
  reducer: {
    logIn: logInReducer,
    register: registerReducer,
    passwordRecup: passwordRecupReducer,
  }
});
