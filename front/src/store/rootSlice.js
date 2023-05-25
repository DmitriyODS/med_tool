import { createSlice } from '@reduxjs/toolkit';

export const rootSlice = createSlice({
  name: 'root',
  initialState: {
    userID: 0,
    userLogin: '',
    isLoading: false,
  },
  reducers: {
    logout: (state) => {
      state.userID = 0;
      state.userLogin = '';
    },
    setUser: (state, action) => {
      state.userID = action.payload.id;
      state.userLogin = action.payload.login;
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
  return state.root.userID !== 0 && state.root.userLogin !== '';
};

export default rootSlice.reducer;
