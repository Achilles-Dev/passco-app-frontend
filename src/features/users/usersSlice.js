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

export const updateUser = createAsyncThunk('users/updateUser', async ({ token, user }) => {
  const res = await axios.patch(`${baseUrl}/v1/users/${user.id}`, { user: { ...user } },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    user,
  };
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (token, userId) => {
  const res = await axios.patch(`${baseUrl}/v1/users/id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    id: userId,
  };
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
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { user } = action.payload;
        const singleUser = state.entities[user.id];
        if (singleUser) {
          singleUser.username = user.username;
          singleUser.email = user.email;
        }
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        usersAdapter.removeOne(state, id);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);
