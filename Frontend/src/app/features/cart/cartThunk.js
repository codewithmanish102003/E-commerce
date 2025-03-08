import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCartProducts } from "../../../services/api/cartApi";

export const fetchCartProductsThunk = createAsyncThunk(
  'cart/fetchCartProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCartProducts();
      console.log('Cart API response:', response);
      return response;
    } catch (error) {
      console.error('Error in fetchCartProductsThunk:', error);
      return rejectWithValue(error.message);
    }
  }
);

