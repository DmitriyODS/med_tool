import { createSlice } from '@reduxjs/toolkit';

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    filterDay: 0,
    curItem: null,
  },
  reducers: {
    setFilterDay: (state, action) => {
      state.filterDay = action.payload;
    },
    setCurItem: (state, action) => {
      state.curItem = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setFilterDay, setCurItem } = diarySlice.actions;

export const selectFilterDay = (state) => state.diary.filterDay;
export const selectCurItem = (state) => state.diary.curItem;

export default diarySlice.reducer;