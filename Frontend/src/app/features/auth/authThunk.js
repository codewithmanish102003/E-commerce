import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../../../services/api/authApi";

// Login thunk
export const loginThunk = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        const response = await loginUser(userData);
        console.log("Login successful:", response);
        return response;
      } catch (error) {
        console.error("Login failed:", error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

// Logout thunk
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await logoutUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);