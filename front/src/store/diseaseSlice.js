import { createSlice } from '@reduxjs/toolkit';

export const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    filterTypeDisease: 0,
  },
  reducers: {
    setFilterTypeDisease: (state, action) => {
      state.filterTypeDisease = action.payload;
    },
  },
});

export const { setFilterTypeDisease } = diseaseSlice.actions;

export const selectFilterTypeDisease = (state) => state.disease.filterTypeDisease;

export default diseaseSlice.reducer;