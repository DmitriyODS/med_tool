import { createSlice } from '@reduxjs/toolkit';

export const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    filterTypeDisease: 0,
    curItem: null,
    data: [],
  },
  reducers: {
    setFilterTypeDisease: (state, action) => {
      state.filterTypeDisease = action.payload;
    },
    setCurItem: (state, action) => {
      state.curItem = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setFilterTypeDisease, setCurItem, setData } = diseaseSlice.actions;

export const selectFilterTypeDisease = (state) => state.disease.filterTypeDisease;
export const selectCurItem = (state) => state.disease.curItem;
export const selectData = (state) => state.disease.data;

export default diseaseSlice.reducer;