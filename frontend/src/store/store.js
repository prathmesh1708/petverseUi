import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../UserApplication/Authentication/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
