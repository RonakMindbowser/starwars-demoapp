import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    reset: state => initialState,
    requestStarted: state => {
      state.loading = true;
    },
    requestCompleted: state => {
      state.loading = false;
    },
  },
  extraReducers: builder => {},
});

const appReducer = appSlice.reducer;
export const {requestStarted, requestCompleted} = appSlice.actions;
export default appReducer;
