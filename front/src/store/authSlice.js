import { createSlice } from '@reduxjs/toolkit';
import { AuthTypes } from '../globals/consts';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authMode: AuthTypes.Auth,
  },
  reducers: {
    changeAuthMode: (state, action) => {
      state.authMode = action.payload;
    },
  },
});

export const { changeAuthMode } = authSlice.actions;

export const selectAuthMode = (state) => state.auth.authMode;

export default authSlice.reducer;