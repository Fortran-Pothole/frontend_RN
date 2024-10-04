import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  phone: string;
  name: string;
}

const initialState: UserState = {
  phone: '',
  name: '',
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
    },
  },
});

export const {setUserInfo, clearUserInfo} = userSlice.actions;
export default userSlice.reducer;
