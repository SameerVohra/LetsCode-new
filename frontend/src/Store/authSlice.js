import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
const getInitialState = () => {
  const savedState = localStorage.getItem("authStatus");
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (e) {
      console.error("Failed to parse auth status from local storage", e);
    }
  }
  return { auth: false, userData: null };
};

const initialState = getInitialState();

=======
const initialState = {
  auth: false,
  userData: null,
};

>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.userData = action.payload;
<<<<<<< HEAD
      try {
        localStorage.setItem("authStatus", JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save auth status to local storage", e);
      }
=======
      localStorage.setItem("authStatus", JSON.stringify(state));
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
    },
    logout: (state) => {
      state.auth = false;
      state.userData = null;
<<<<<<< HEAD
      try {
        localStorage.removeItem("authStatus");
      } catch (e) {
        console.error("Failed to remove auth status from local storage", e);
      }
=======
      localStorage.removeItem("authStatus");
>>>>>>> 3124620358a78cb3ec72482b85d62042b0e166e3
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
