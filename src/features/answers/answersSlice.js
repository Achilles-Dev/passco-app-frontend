import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://passco-app-backend.herokuapp.com/api';

export const fetchAnswers = createAsyncThunk('answers/fetchAnswers', async ({ token, subjectId, questionId }) => {
  const res = await axios.get(`${baseUrl}/v1/answers?subject_id=${subjectId}?question_id=${questionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

export const addAnswer = createAsyncThunk('answers/addAnswer', async ({ token, answers, ids }) => {
  const res = await axios.post(`${baseUrl}/v1/answers?subject_id=${ids.subjectId}?question_id=${ids.questionId}`, { answers },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

export const updateAnswer = createAsyncThunk('answers/updateAnswer', async ({ token, answers, answerId }) => {
  const res = await axios.patch(`${baseUrl}/v1/answers/${answerId}`, { answers },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    answers,
    id: answerId,
  };
});

export const deleteAnswer = createAsyncThunk('answers/deleteAnswer', async ({ token, answerId }) => {
  const res = await axios.delete(`${baseUrl}/v1/answers/${answerId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    id: answerId,
  };
});

const answersAdapter = createEntityAdapter();

const initialState = answersAdapter.getInitialState({
  status: 'idle',
});

/* eslint no-param-reassign: ["error", { "props": false }] */

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    resetAnswers: (state) => {
      state.status = 'idle';
      answersAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        answersAdapter.addOne(state, action.payload);
      })
      .addCase(addAnswer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchAnswers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        answersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAnswers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { answers, id } = action.payload;
        const singleAnswer = state.entities[id];
        if (singleAnswer) {
          singleAnswer.value = answers.value;
        }
      })
      .addCase(updateAnswer.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        answersAdapter.removeOne(state, id);
      })
      .addCase(deleteAnswer.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default answersSlice.reducer;

export const {
  resetAnswers,
} = answersSlice.actions;

export const {
  selectAll: selectAllAnswers,
  selectById: selectAnswerById,
} = answersAdapter.getSelectors((state) => state.answers);
