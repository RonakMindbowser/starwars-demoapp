import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  loading: false,
  peopleList: [],
  error: null,
  success: false,
};

export const peopleListSlice = createSlice({
  name: 'peopleList',
  initialState: initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {},
});

const peopleListReducer = peopleListSlice.reducer;

export const {reset: peopleListReset} = peopleListSlice.actions;

export default peopleListReducer;
