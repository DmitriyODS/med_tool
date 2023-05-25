import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import rootReducer from './rootSlice';
import diaryReducer from './diarySlice';
import diseaseReducer from './diseaseSlice';
import statisticsReducer from './statisticsSlice';

const RootStore = configureStore({
  reducer: {
    auth: authReducer,
    root: rootReducer,
    diary: diaryReducer,
    disease: diseaseReducer,
    statistics: statisticsReducer,
  },
});

export default RootStore;
