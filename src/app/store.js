import { combineReducers, configureStore } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/es/storage/session';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';
import usersReducer from '../features/users/usersSlice';
import authReducer from '../features/auth/authSlice';
import questionsReducer from '../features/questions/questionsSlice';
import subjectsReducer from '../features/subjects/subjectsSlice';
import answersReducer from '../features/answers/answersSlice';

const rootpersistConfig = {
  key: 'root',
  storage,
};

const usersPersistConfig = {
  key: 'users',
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  questions: questionsReducer,
  subjects: subjectsReducer,
  answers: answersReducer,
});

const persistedReducer = persistReducer(rootpersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
