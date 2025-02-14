import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";
// import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/product/productSlice";
// import ownerReducer from "./features/owner/ownerSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,
    // cart: cartReducer,
    products: productReducer,
    // owner: ownerReducer,
  },
});

export default store;
