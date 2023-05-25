import { createSlice } from '@reduxjs/toolkit';

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    filterDay: 0,
    curItem: null,
    data: [],
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

export const { setFilterDay, setCurItem, setData } = diarySlice.actions;

export const selectFilterDay = (state) => state.diary.filterDay;
export const selectCurItem = (state) => state.diary.curItem;
export const selectData = (state) => state.diary.data;

export default diarySlice.reducer;