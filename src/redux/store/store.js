import {configureStore} from '@reduxjs/toolkit';
import peopleListReducer from '../slices/peopleListSlice';

export const store = configureStore({
  reducer: {
    peopleList: peopleListReducer,
  },
});
