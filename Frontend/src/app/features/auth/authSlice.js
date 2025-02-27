import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk } from "./authThunk";

const initialState = {
  isLoggedIn: false,
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
        console.log("Login pending");
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.role = action.payload.role; // Store the role in state
        console.log("role", state.role);
        
        if(state.role === "owner"){
          state.username = action.payload.owner.fullname;
          state.email=action.payload.owner.email // Store the username
          state.gstno = action.payload.owner.gstno;
        }else if(state.role === "user"){
          state.username = action.payload.user.fullname;
          state.email=action.payload.user.email // Store the username
        }
        console.log("Login fulfilled:", action.payload);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Login rejected:", action.payload);
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = false;
        state.username = null; // Clear the username on logout
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;