import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
  devTools: true,
});

export default store;
