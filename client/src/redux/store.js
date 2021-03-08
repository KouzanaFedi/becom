import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./slices/logInReducer";
// import registerReducer from "./slices/registerReducer";

export default configureStore({
  reducer: {
    logIn: logInReducer,
    // register: registerReducer,
  },
});
