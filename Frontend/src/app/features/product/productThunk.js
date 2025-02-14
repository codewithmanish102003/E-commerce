import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById } from "../../../services/api/productApi";

// **Fetch all products**
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllProducts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// **Fetch single product by ID**
export const fetchProductByIdThunk = createAsyncThunk(
  "products/fetchById",
  async (productId, thunkAPI) => {
    try {
      const response = await fetchProductById(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default {
  fetchProducts,
  fetchProductByIdThunk,
};