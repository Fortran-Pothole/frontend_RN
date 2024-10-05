import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  autoReports: [], // 자동 신고 목록
};

const autoPotholeSlice = createSlice({
  name: 'autoPothole',
  initialState,
  reducers: {
    addAutoReport: (state, action) => {
      state.autoReports.push(action.payload);
    },
    removeAutoReport: (state, action) => {
      state.autoReports = state.autoReports.filter(
        report => report.id !== action.payload,
      );
    },
    updateAutoReport: (state, action) => {
      const index = state.autoReports.findIndex(
        report => report.id === action.payload.id,
      );
      if (index !== -1) {
        state.autoReports[index] = action.payload;
      }
    },
  },
});

export const {addAutoReport, removeAutoReport, updateAutoReport} =
  autoPotholeSlice.actions;
export default autoPotholeSlice.reducer;
