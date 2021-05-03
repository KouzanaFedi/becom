import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./logic/auth/logInReducer";
import registerReducer from "./logic/auth/registerReducer";
import passwordRecupReducer from "./logic/auth/passwordRecupReducer";
import drawerReducer from "./ui/drawerReducer";
import scheduleSlice from "./logic/projectManager/scheduleSlice";

export default configureStore({
  reducer: {
    logIn: logInReducer,
    register: registerReducer,
    passwordRecup: passwordRecupReducer,
    drawerReducer: drawerReducer,
    schedule: scheduleSlice,
  }
});
