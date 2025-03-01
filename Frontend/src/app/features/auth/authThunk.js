import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser,registerUser } from "../../../services/api/authApi";

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData,thunkAPI) => {
    try{
     const response = await registerUser(userData)
     console.log("Registered", response)
     return response
    }catch(err){
      // console.log("Failed to register user", err.message)
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)



// Login thunk
export const loginThunk = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        const response = await loginUser(userData);
        console.log("Logged in", response);
        
        localStorage.setItem("token", response.token);
        return response;
      } catch (error) {
        // console.log("Failed to login user", error.message);
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
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);