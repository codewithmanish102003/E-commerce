import { createSlice } from "@reduxjs/toolkit";
import { fetchCartProductsThunk } from "./cartThunk";

const initialState = {
  status: 'active',
  error: 'null',
  cart: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProductsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartProductsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload.cart;
        state.total = action.payload.total;
        console.log('Cart state after update:', state);
      })
      .addCase(fetchCartProductsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
})

export default cartSlice.reducer;