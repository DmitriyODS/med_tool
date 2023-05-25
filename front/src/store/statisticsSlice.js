import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetDiary } from '../api/diary';

export const getStatistics = createAsyncThunk(
  'statistics/getStatistics',
  async (arg, thunkAPI) => {
    return await GetDiary(0, 200);
  },
);

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    data: [],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStatistics: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStatistics.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStatistics, setLoading } = statisticsSlice.actions;

export const selectStatistics = state => state.statistics.data;
export const selectLoadingStatistics = state => state.statistics.loading;

export default statisticsSlice.reducer;