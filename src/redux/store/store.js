import {configureStore} from '@reduxjs/toolkit';
import peopleListReducer from '../slices/peopleListSlice';
import appReducer from '../slices/appSlice';
import charDetailReducer from '../slices/charDetailSlice';
import homeWorldDetailReducer from '../slices/homeWorldSlice';

export const store = configureStore({
  reducer: {
    peopleList: peopleListReducer,
    app: appReducer,
    charDetail: charDetailReducer,
    homeWorldDetail: homeWorldDetailReducer,
  },
});
