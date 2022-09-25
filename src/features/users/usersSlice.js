import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const baseUrl = 'https://passco-app-backend.herokuapp.com/api'

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(`${baseUrl}/v1/users`);
  return res.data;
});

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: 'idle'
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      usersAdapter.upsertMany(state, action.payload)
    })
  }
})

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users);
