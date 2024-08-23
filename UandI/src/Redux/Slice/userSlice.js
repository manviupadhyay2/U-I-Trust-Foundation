// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {
      email: null,
      role: null,
      token: null,
      isAuthenticated: false,
    };

const initialState = {
  isFetching: false,
  user: savedUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.user = {
        email: action.payload.email,
        role: action.payload.role,
        token: action.payload.token,
        isAuthenticated: true,
      };
      state.isFetching = false;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    loginFailure: (state) => {
      state.user = {
        email: null,
        role: null,
        token: null,
        isAuthenticated: false,
      };
      state.isFetching = false;
      localStorage.removeItem('user');
    },
  },
});

export const {
  setIsFetching,
  loginSuccess,
  loginFailure,
} = userSlice.actions;

export default userSlice.reducer;
