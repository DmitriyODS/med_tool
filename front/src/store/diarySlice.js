import { createSlice } from '@reduxjs/toolkit';

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    filterDay: 0,
  },
  reducers: {
    setFilterDay: (state, action) => {
      state.filterDay = action.payload;
    },
  },
});

export const { setFilterDay } = diarySlice.actions;

export const selectFilterDay = (state) => state.diary.filterDay;

export default diarySlice.reducer;