import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const baseUrl = 'https://passco-app-backend.herokuapp.com/api';
const baseUrl = 'http://localhost:3000/api';

export const signUp = createAsyncThunk('users/signup', async (user) => {
  const res = await axios.post(`${baseUrl}/users`, user);
  return res.data;
});

export const signIn = createAsyncThunk('users/signin', async (user) => {
  const res = await axios.post(`${baseUrl}/users/sign_in`, user);
  return res.data;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (userId, token) => {
  const res = await axios.get(`${baseUrl}/v1/users/:id=${userId}`);
  return (res.data, token);
});

const authAdapter = createEntityAdapter({
  selectId: (auth) => auth.user.id,
});

const initialState = authAdapter.getInitialState({
  status: 'idle',
});

/* eslint no-param-reassign: ["error", { "props": false }] */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state, action) => {
      state.status = 'idle';
      authAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        authAdapter.addOne(state, action.payload);
      })
      .addCase(signUp.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        authAdapter.addOne(state, action.payload);
      })
      .addCase(signIn.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        authAdapter.addOne(state, action.payload);
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  signOut,
} = authSlice.actions;

export default authSlice.reducer;
