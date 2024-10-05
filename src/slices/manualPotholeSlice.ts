// slices/manualPotholeSlice.ts

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

// 신고 목록을 가져오는 Thunk 액션
export const fetchManualReports = createAsyncThunk(
  'manualPothole/fetchManualReports',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('http://15.164.23.163/report');
      return response.data; // 성공 시 서버에서 반환한 데이터를 리턴
    } catch (error) {
      return rejectWithValue(
        error.response?.data || '신고 목록을 가져오는 데 실패했습니다.',
      );
    }
  },
);

// 특정 수동 신고 데이터를 가져오는 Thunk 액션
export const fetchManualReportById = createAsyncThunk(
  'manualPothole/fetchManualReportById',
  async (report_id, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://15.164.23.163/report/${report_id}`,
      );
      return response.data; // 성공 시 서버에서 반환한 데이터를 리턴
    } catch (error) {
      return rejectWithValue(
        error.response?.data || '신고 데이터를 가져오는 데 실패했습니다.',
      );
    }
  },
);

// 백엔드에 수동 신고 데이터를 전송하는 thunk 액션
export const postManualReport = createAsyncThunk(
  'manualPothole/postManualReport',
  async (newReport, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'http://15.164.23.163/report',
        newReport,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || '신고 생성에 실패했습니다.',
      );
    }
  },
);

const initialState = {
  manualReports: [], // 수동 신고 목록
  status: 'idle',
  error: null,
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
  extraReducers: builder => {
    builder
      .addCase(postManualReport.pending, state => {
        state.status = 'loading';
      })
      .addCase(postManualReport.fulfilled, (state, action) => {
        state.manualReports.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(postManualReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchManualReports.pending, state => {
        state.status = 'loading'; // GET 요청이 진행 중일 때
      })
      .addCase(fetchManualReports.fulfilled, (state, action) => {
        state.manualReports = action.payload; // 서버에서 가져온 데이터를 스토어에 저장
        state.status = 'succeeded'; // 요청 성공
      })
      .addCase(fetchManualReports.rejected, (state, action) => {
        state.status = 'failed'; // 요청 실패
        state.error = action.payload; // 에러 메시지 저장
      })
      // GET 특정 신고 조회 처리
      .addCase(fetchManualReportById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchManualReportById.fulfilled, (state, action) => {
        const report = action.payload;
        const existingReportIndex = state.manualReports.findIndex(
          r => r.id === report.id,
        );
        if (existingReportIndex !== -1) {
          state.manualReports[existingReportIndex] = report; // 업데이트
        } else {
          state.manualReports.push(report); // 새로 추가
        }
        state.status = 'succeeded';
      })
      .addCase(fetchManualReportById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {addManualReport, removeManualReport, updateManualReport} =
  manualPotholeSlice.actions;
export default manualPotholeSlice.reducer;
