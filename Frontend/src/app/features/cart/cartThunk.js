import { createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, fetchCartProducts, removeFromCart, updateQuantity } from "../../../services/api/cartApi";

export const fetchCartProductsThunk = createAsyncThunk(
  'cart/fetchCartProducts',
  async (_, thunkAPI) => {
    try {
      const response = await fetchCartProducts();
      console.log('Cart API response:', response);
      return response;
    } catch (error) {
      console.error('Error in fetchCartProductsThunk:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async (product, thunkAPI) => {
    try {
      const response = await addToCart(product._id)
      console.log(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const updateQuantityThunk = createAsyncThunk(
  'cart/updateQuantity',
  async ({ payload }, thunkAPI) => {
    const { productId, operation } = payload;
    console.log('updateQuantityThunk:', productId, operation);
    try {
      const response = await updateQuantity(productId, operation);
      console.log('updateQuantity response:', response);
      return { productId, operation };
    } catch (error) {
      console.error('updateQuantity error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProductThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, thunkAPI) => {
    try {
      const response = await removeFromCart(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);