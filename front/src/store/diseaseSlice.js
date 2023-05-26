import { createSlice } from '@reduxjs/toolkit';
import { EditModes } from '../globals/consts';

export const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    filterTypeDisease: 0,
    curItem: null,
    openEditDialog: false,
    viewMode: EditModes.View,
    oldData: false,
  },
  reducers: {
    setFilterTypeDisease: (state, action) => {
      state.filterTypeDisease = action.payload;
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
  setFilterTypeDisease,
  setCurItem,
  closeEditDialog,
  openAddDialog,
  openEditDialog,
  openViewDialog,
  setOldData,
} = diseaseSlice.actions;

export const selectFilterTypeDisease = (state) => state.disease.filterTypeDisease;
export const selectCurItem = (state) => state.disease.curItem;
export const selectOpenEditDialog = (state) => state.disease.openEditDialog;
export const selectViewMode = (state) => state.disease.viewMode;
export const selectOldData = (state) => state.disease.oldData;

export default diseaseSlice.reducer;
