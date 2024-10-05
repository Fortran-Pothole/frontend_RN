// slices/manualPotholeSlice.ts

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  manualReports: [], // 수동 신고 목록
};

const manualPotholeSlice = createSlice({
  name: 'manualPothole',
  initialState,
  reducers: {
    addManualReport: (state, action) => {
      state.manualReports.push(action.payload);
    },
    removeManualReport: (state, action) => {
      state.manualReports = state.manualReports.filter(
        report => report.id !== action.payload,
      );
    },
    updateManualReport: (state, action) => {
      const index = state.manualReports.findIndex(
        report => report.id === action.payload.id,
      );
      if (index !== -1) {
        state.manualReports[index] = action.payload;
      }
    },
  },
});

export const {addManualReport, removeManualReport, updateManualReport} =
  manualPotholeSlice.actions;
export default manualPotholeSlice.reducer;
