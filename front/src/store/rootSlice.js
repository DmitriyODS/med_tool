import { createSlice } from '@reduxjs/toolkit';

export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    curUser: null,
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.curUser = null;
    },
    login: (state, action) => {
      state.curUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { logout, login, setLoading } = rootSlice.actions;

export const selectCurUser = (state) => state.root.curUser;
export const selectIsLoading = (state) => state.root.isLoading;

export default rootSlice.reducer;