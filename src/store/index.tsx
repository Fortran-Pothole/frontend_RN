// src/store/index.js
import {configureStore} from '@reduxjs/toolkit';
import manualPotholeReducer from '../slices/manualPotholeSlice';
import autoPotholeReducer from '../slices/autoPotholeSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    manualPothole: manualPotholeReducer, // 수동 신고 slice
    autoPothole: autoPotholeReducer, // 자동 신고 slice
    user: userReducer,
  },
});

export default store;
