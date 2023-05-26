import { createSlice } from '@reduxjs/toolkit';
import { EditModes } from '../globals/consts';

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    filterDay: 0,
    curItem: null,
    openEditDialog: false,
    viewMode: EditModes.View,
    oldData: false,
  },
  reducers: {
    setFilterDay: (state, action) => {
      state.filterDay = action.payload;
    },
    setCurItem: (state, action) => {
      state.curItem = action.payload;
    },
    openAddDialog: (state) => {
      state.openEditDialog = true;
      state.viewMode = EditModes.Create;
    },
    openEditDialog: (state) => {
      state.openEditDialog = true;
      state.viewMode = EditModes.Edit;
    },
    openViewDialog: (state) => {
      state.openEditDialog = true;
      state.viewMode = EditModes.View;
    },
    closeEditDialog: (state) => {
      state.openEditDialog = false;
      state.viewMode = EditModes.View;
    },
    setOldData: (state, action) => {
      state.oldData = action.payload;
      state.curItem = null;
    },
  },
});

export const {
  setFilterDay,
  setCurItem,
  openAddDialog,
  openViewDialog,
  closeEditDialog,
  openEditDialog,
  setOldData,
} = diarySlice.actions;

export const selectFilterDay = (state) => state.diary.filterDay;
export const selectCurItem = (state) => state.diary.curItem;
export const selectOpenEditDialog = (state) => state.diary.openEditDialog;
export const selectViewMode = (state) => state.diary.viewMode;
export const selectOldData = (state) => state.diary.oldData;

export default diarySlice.reducer;
