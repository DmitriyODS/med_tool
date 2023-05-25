import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import rootReducer from './rootSlice';

const RootStore = configureStore({
  reducer: {
    auth: authReducer,
    root: rootReducer,
  },
});

export default RootStore;
