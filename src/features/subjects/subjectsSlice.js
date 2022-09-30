import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://passco-app-backend.herokuapp.com/api';

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async (token) => {
  const res = await axios.get(`${baseUrl}/v1/subjects`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

export const addSubject = createAsyncThunk('subjects/addSubject', async ({ token, subject }) => {
  const res = await axios.post(`${baseUrl}/v1/subjects`, { subject },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

export const updateSubject = createAsyncThunk('subjects/updateSubject', async ({ token, subject, subjectId }) => {
  const res = await axios.patch(`${baseUrl}/v1/subjects/${subjectId}`, { subject },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    subject,
    id: subjectId,
  };
});

export const deleteSubject = createAsyncThunk('subjects/deleteSubject', async ({ token, subjectId }) => {
  const res = await axios.delete(`${baseUrl}/v1/subjects/${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    id: subjectId,
  };
});

const subjectsAdapter = createEntityAdapter();

const initialState = subjectsAdapter.getInitialState({
  status: 'idle',
});

/* eslint no-param-reassign: ["error", { "props": false }] */

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    resetSubjects: (state) => {
      state.status = 'idle';
      subjectsAdapter.removeAll;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addSubject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subjectsAdapter.addOne(state, action.payload);
      })
      .addCase(addSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchSubjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        subjectsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchSubjects.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { subject, id } = action.payload;
        const singleSubject = state.entities[id];
        if (singleSubject) {
          singleSubject.name = subject.name;
          singleSubject.code = subject.code;
        }
      })
      .addCase(updateSubject.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteSubject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        subjectsAdapter.removeOne(state, id);
      })
      .addCase(deleteSubject.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default subjectsSlice.reducer;

export const {
  resetSubjects,
} = subjectsSlice.actions;

export const {
  selectAll: selectAllSubjects,
  selectById: selectSubjectById,
} = subjectsAdapter.getSelectors((state) => state.subjects);
