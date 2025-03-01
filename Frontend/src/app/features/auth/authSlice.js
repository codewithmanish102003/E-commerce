// filepath: /d:/E-commerce/Frontend/src/app/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerUserThunk } from "./authThunk";

const token = localStorage.getItem("token");

const initialState = {
  isLoggedIn: !!token,
  status: "idle",
  error: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.role = action.payload.role;
        if (state.role === "owner") {
          state.username = action.payload.owner.fullname;
          state.email = action.payload.owner.email;
          state.gstno = action.payload.owner.gstno;
        } else {
          state.username = action.payload.user.fullname;
          state.email = action.payload.user.email;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.username = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;