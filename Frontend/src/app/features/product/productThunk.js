import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById, createProduct } from "../../../services/api/productApi";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllProducts();
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch single product by ID
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

// Create a new product
export const createProductThunk = createAsyncThunk(
  "products/create",
  async (product, thunkAPI) => {
    try {
      const response = await createProduct(product);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export default {
  fetchProducts,
  fetchProductByIdThunk,
  createProductThunk,
};