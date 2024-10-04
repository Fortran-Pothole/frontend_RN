// src/store/index.js
import {configureStore} from '@reduxjs/toolkit';
import potholeReducer from '../slices/potholeSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    pothole: potholeReducer,
    user: userReducer,
  },
});

export default store;
