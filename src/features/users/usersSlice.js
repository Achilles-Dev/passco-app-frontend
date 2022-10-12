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

export const updateUser = createAsyncThunk('users/updateUser', async ({ token, user, userId }) => {
  const res = await axios.patch(`${baseUrl}/v1/users/${user.id}`, { user },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    user,
    id: userId,
  };
});

export const deleteUser = createAsyncThunk('users/deleteUser', async ({ token, userId }) => {
  const res = await axios.delete(`${baseUrl}/v1/users/${userId}`,
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

export const fetchUserData = createAsyncThunk('users/fetchUserData', async ({ token }) => {
  const res = await axios
    .get(`${baseUrl}/v1/user_data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  return res.data;
});

export const addUserData = createAsyncThunk('users/addUserData', async ({
  token, userId, subjectId, score,
}) => {
  const res = await axios
    .post(`${baseUrl}/v1/user_data?user_id=${userId}?subject_id=${subjectId}`, { score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  return res.data;
});

export const deleteUserData = createAsyncThunk('users/deleteUserData', async ({ token, userDataId }) => {
  const res = await axios
    .delete(`${baseUrl}/v1/user_data/${userDataId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  return {
    message: res.data,
    id: userDataId,
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
  reducers: {
    resetUsers: (state) => {
      state.status = 'idle';
      usersAdapter.removeAll(state);
    },
    addUserData: (state, action) => {
      const singleUser = state.entities[action.payload.user_id];
      if (singleUser) {
        state.status = 'fulfilled';
        state.auth = {
          ...state.auth, userData: action.payload,
        };
      }
    },
    deleteUserData: (state, action) => {
      const singleUser = state.entities[action.payload.id];
      if (singleUser) {
        state.status = 'fulfilled';
        state.auth.userData = {
          ...state.auth.userData,
          userData: state.auth.userData.filter((id) => id !== action.payload.id),
        };
      }
    },
  },
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
        const { user, id } = action.payload;
        const singleUser = state.entities[id];
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
  resetUsers,
} = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users);
