import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterSlice';

const store = configureStore({
  reducer: {
    filter: filterReducer, // Add the filter reducer to the store
  },
});

export default store;
