import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.userData = action.payload;
      localStorage.setItem("authStatus", JSON.stringify(state));
    },
    logout: (state) => {
      state.auth = false;
      state.userData = null;
      localStorage.removeItem("authStatus");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
