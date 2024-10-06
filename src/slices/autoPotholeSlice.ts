import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// 자동 신고 목록을 가져오는 Thunk 액션
export const fetchAutoReports = createAsyncThunk(
  'autoPothole/fetchAutoReports',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get('http://15.164.23.163/pothole/');
      return response.data; // 성공 시 서버에서 반환한 데이터를 리턴
    } catch (error) {
      return rejectWithValue(
        error.response?.data || '자동 신고 목록을 가져오는 데 실패했습니다.',
      );
    }
  },
);

// 특정 자동 신고 데이터를 가져오는 Thunk 액션
export const fetchAutoReportById = createAsyncThunk(
  'autoPothole/fetchAutoReportById',
  async (pothole_id, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `http://15.164.23.163/pothole/${pothole_id}`,
      );
      return response.data; // 성공 시 서버에서 반환한 데이터를 리턴
    } catch (error) {
      return rejectWithValue(
        error.response?.data || '자동 신고 데이터를 가져오는 데 실패했습니다.',
      );
    }
  },
);

const initialState = {
  autoReports: [], // 자동 신고 목록
  selectedAutoReport: null,
  status: 'idle',
  error: null,
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
  extraReducers: builder => {
    builder
      // 자동 신고 목록 가져오기 처리
      .addCase(fetchAutoReports.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAutoReports.fulfilled, (state, action) => {
        state.autoReports = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAutoReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      / 특정 자동 신고 가져오기 로직 추가
      .addCase(fetchAutoReportById.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAutoReportById.fulfilled, (state, action) => {
        state.selectedAutoReport = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAutoReportById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {addAutoReport, removeAutoReport, updateAutoReport} =
  autoPotholeSlice.actions;
export default autoPotholeSlice.reducer;
