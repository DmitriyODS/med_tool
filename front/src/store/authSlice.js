import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authMode: 0,
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