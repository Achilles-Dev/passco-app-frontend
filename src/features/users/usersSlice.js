import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://passco-app-backend.herokuapp.com/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (token) => {
  const res = await axios.get(`${baseUrl}/v1/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: 'idle',
});

/* eslint no-param-reassign: ["error", { "props": false }] */

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);
