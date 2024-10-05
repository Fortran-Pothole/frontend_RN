import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

// 로그인 Thunk 액션
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    {name, password}: {name: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post('http://15.164.23.163/user/login', {
        name,
        password,
      });
      return response.data; // 성공 시 백엔드에서 반환한 사용자 정보
    } catch (error) {
      return rejectWithValue(error.response?.data || '로그인에 실패했습니다.');
    }
  },
);

// 회원가입 Thunk 액션
export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (
    {name, phone, password}: {name: string; phone: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post('http://15.164.23.163/user/signup', {
        name,
        phone,
        password,
      });
      return response.data; // 성공 시 백엔드에서 반환한 사용자 정보
    } catch (error) {
      return rejectWithValue(
        error.response?.data || '회원가입에 실패했습니다.',
      );
    }
  },
);

interface UserState {
  phone: string;
  name: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  phone: '',
  name: '',
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (
      state,
      action: PayloadAction<{name: string; phone: string}>,
    ) => {
      state.phone = action.payload.phone;
      state.name = action.payload.name;
    },
    clearUserInfo: state => {
      state.phone = '';
      state.name = '';
      state.status = 'idle';
      state.error = null;
    },
  },

  extraReducers: builder => {
    // 로그인 처리
    builder.addCase(loginUser.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.phone = action.payload.phone;
      state.name = action.payload.name;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // 회원가입 처리
    builder.addCase(signUpUser.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.phone = action.payload.phone;
      state.name = action.payload.name;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const {setUserInfo, clearUserInfo} = userSlice.actions;
export default userSlice.reducer;
