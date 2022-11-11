import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'https://passco-app-backend.herokuapp.com/api';

export const addQuestion = createAsyncThunk('questions/addQuestion', async ({ token, questions, queryParams }) => {
  const res = await axios.post(`${baseUrl}/v1/questions?subject_id=${queryParams.subjectId}&year=${queryParams.year}`, { questions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async ({ token, year, subjectId }) => {
  const res = await axios.get(`${baseUrl}/v1/questions?year=${year}&subject_id=${subjectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return res.data;
});

export const updateQuestion = createAsyncThunk('questions/updateQuestion', async ({ token, questions, questionId }) => {
  const res = await axios.patch(`${baseUrl}/v1/questions/${questionId}`, { questions },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    questions,
    id: questionId,
  };
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async ({ token, questionId }) => {
  const res = await axios.delete(`${baseUrl}/v1/questions/${questionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return {
    message: res.data,
    id: questionId,
  };
});

const questionsAdapter = createEntityAdapter({
  selectId: (question) => question.question_no,
});

const initialState = questionsAdapter.getInitialState({
  status: 'idle',
});

/* eslint no-param-reassign: ["error", { "props": false }] */

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    resetQuestions: (state) => {
      state.status = 'idle';
      questionsAdapter.removeAll(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        questionsAdapter.addOne(state, action.payload);
      })
      .addCase(addQuestion.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        questionsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { questions, id } = action.payload;
        const singleQuestion = state.entities[id];
        if (singleQuestion) {
          singleQuestion.question_no = questions.question_no;
          singleQuestion.content = questions.content;
          singleQuestion.options = questions.options;
        }
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id } = action.payload;
        questionsAdapter.removeOne(state, id);
      })
      .addCase(deleteQuestion.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default questionsSlice.reducer;

export const {
  resetQuestions,
} = questionsSlice.actions;

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
} = questionsAdapter.getSelectors((state) => state.questions);
