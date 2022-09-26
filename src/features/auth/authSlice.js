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

const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
  status: 'idle',
});

/* eslint no-param-reassign: ["error", { "props": false }] */

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state) => {
        state.status = 'succeeded';
        authAdapter.addOne;
      })
      .addCase(signIn.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state) => {
        state.status = 'succeeded';
        authAdapter.addOne;
      });
  },
});

export default authSlice.reducer;
