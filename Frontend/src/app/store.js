import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";

const customMiddleware = store => next => action => {
  console.log("Middleware: ", action);
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware),
});

export default store;