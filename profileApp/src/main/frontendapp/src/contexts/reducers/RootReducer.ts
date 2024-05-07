import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { AdminReducer } from "./AdminReducer";
import { EmployeeStatusReducer } from "./EmployeeStatusReducer";

export const RootReducer = combineReducers({
  auth: AuthReducer,
  admin: AdminReducer,
  employeeStatus: EmployeeStatusReducer,
});
