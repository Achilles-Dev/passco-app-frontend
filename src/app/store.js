import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer
  }
})