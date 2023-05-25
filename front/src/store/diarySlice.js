import { createSlice } from '@reduxjs/toolkit';
import { EditModes } from '../globals/consts';

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    filterDay: 0,
    curItem: null,
    openEditDialog: false,
    viewMode: EditModes.View,
  },
  reducers: {
    setFilterDay: (state, action) => {
      state.filterDay = action.payload;
    },
    setCurItem: (state, action) => {
      state.curItem = action.payload;
    },
    setOpenEditDialog: (state, action) => {
      state.openEditDialog = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setFilterDay, setCurItem, setOpenEditDialog, setViewMode } = diarySlice.actions;

export const selectFilterDay = (state) => state.diary.filterDay;
export const selectCurItem = (state) => state.diary.curItem;
export const selectOpenEditDialog = (state) => state.diary.openEditDialog;
export const selectViewMode = (state) => state.diary.viewMode;

export default diarySlice.reducer;