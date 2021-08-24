import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./logic/auth/logInReducer";
import registerReducer from "./logic/auth/registerReducer";
import passwordRecupReducer from "./logic/auth/passwordRecupReducer";
import drawerReducer from "./ui/drawerReducer";
import scheduleSlice from "./logic/projectManager/scheduleSlice";
import sharedScheduleSlice from "./logic/projectManager/sharedScheduleSlice";
import kanbanBoardSlice from "./logic/projectManager/kanbanBoardSlice";
import userSlice from "./logic/userSlice";
import menuSlice from "./ui/menuSlice";
import invoiceSlice from "./logic/projectManager/invoiceSlice";
import invoiceUiSlice from "./ui/invoiceUiSlice";
import projectsUiSlice from "./ui/projectsUiSlice";
import projectSlice from "./logic/projectManager/projectSlice";

export default configureStore({
  reducer: {
    logIn: logInReducer,
    register: registerReducer,
    passwordRecup: passwordRecupReducer,
    user: userSlice,
    drawerReducer: drawerReducer,
    menu: menuSlice,
    schedule: scheduleSlice,
    sharedSchedule: sharedScheduleSlice,
    kanbanBoard: kanbanBoardSlice,
    invoice: invoiceSlice,
    invoiceUI: invoiceUiSlice,
    projectsUi: projectsUiSlice,
    project: projectSlice
  }
});
