import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priorityFilter: 'All', // Default filter is 'All', meaning no filter is applied
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload; // Set the new filter value
    },
  },
});

export const { setPriorityFilter } = filterSlice.actions;
export const selectPriorityFilter = (state) => state.filter.priorityFilter;

export default filterSlice.reducer;
