import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;
