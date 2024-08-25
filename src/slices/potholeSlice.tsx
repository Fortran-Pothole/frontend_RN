import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  reports: [], // 신고 목록을 저장할 배열
};

const potholeSlice = createSlice({
  name: 'pothole',
  initialState,
  reducers: {
    addReport: (state, action) => {
      state.reports.push(action.payload);
    },
    removeReport: (state, action) => {
      state.reports = state.reports.filter(
        report => report.id !== action.payload,
      );
    },
    updateReport: (state, action) => {
      const index = state.reports.findIndex(
        report => report.id === action.payload.id,
      );
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },
  },
});

export const {addReport, removeReport, updateReport} = potholeSlice.actions;
export default potholeSlice.reducer;
