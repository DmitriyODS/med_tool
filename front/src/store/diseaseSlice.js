import { createSlice } from '@reduxjs/toolkit';
import { EditModes } from '../globals/consts';

export const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    filterTypeDisease: 0,
    curItem: null,
    openEditDialog: false,
    viewMode: EditModes.View,
  },
  reducers: {
    setFilterTypeDisease: (state, action) => {
      state.filterTypeDisease = action.payload;
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

export const { setFilterTypeDisease, setCurItem, setOpenEditDialog, setViewMode } =
  diseaseSlice.actions;

export const selectFilterTypeDisease = (state) => state.disease.filterTypeDisease;
export const selectCurItem = (state) => state.disease.curItem;
export const selectOpenEditDialog = (state) => state.disease.openEditDialog;
export const selectViewMode = (state) => state.disease.viewMode;

export default diseaseSlice.reducer;
