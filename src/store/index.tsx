// src/store/index.js
import {configureStore} from '@reduxjs/toolkit';
import potholeReducer from '../slices/potholeSlice';

const store = configureStore({
  reducer: {
    pothole: potholeReducer,
  },
});

export default store;
