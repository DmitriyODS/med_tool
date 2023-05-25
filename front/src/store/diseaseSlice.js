import { createSlice } from '@reduxjs/toolkit';

export const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    filterTypeDisease: 0,
    curItem: null,
  },
  reducers: {
    setFilterTypeDisease: (state, action) => {
      state.filterTypeDisease = action.payload;
    },
    setCurItem: (state, action) => {
      state.curItem = action.payload;
    },
  },
});

export const { setFilterTypeDisease, setCurItem } = diseaseSlice.actions;

export const selectFilterTypeDisease = (state) => state.disease.filterTypeDisease;
export const selectCurItem = (state) => state.disease.curItem;

export default diseaseSlice.reducer;