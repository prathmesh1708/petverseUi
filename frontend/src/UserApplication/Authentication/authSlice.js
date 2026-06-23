import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  pets: [],
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.pets = action.payload.pets || [];
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.pets = [];
      state.isAuthenticated = false;
    },
    updatePets: (state, action) => {
      state.pets = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const { loginSuccess, logout, updatePets, setToken } = authSlice.actions;

export default authSlice.reducer;
