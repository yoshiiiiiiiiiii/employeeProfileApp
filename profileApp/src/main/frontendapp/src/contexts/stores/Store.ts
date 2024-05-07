import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "../reducers/RootReducer";

export const Store = configureStore({
  reducer: RootReducer,
});
