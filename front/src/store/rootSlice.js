import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Authentication } from '../globals/utils';


export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    userID: 0,
    userLogin: '',
    accessToken: '',
    refreshToken: '',
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.userID = 0;
      state.userLogin = '';
      state.accessToken = '';
      state.refreshToken = '';
    },
    setUser: (state, action) => {
      state.userID = action.payload.userID;
      state.userLogin = action.payload.login;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { logout, setLoading, setUser } = rootSlice.actions;

export const selectUserLogin = (state) => state.root.userLogin;
export const selectIsLoading = (state) => state.root.isLoading;
export const selectIsLogin = (state) => {
  return state.root.userID !== 0 &&
    state.root.accessToken !== '' &&
    state.root.refreshToken !== '' &&
    state.root.userLogin !== '';
};

export default rootSlice.reducer;