import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import HTTPService from '../../networkConfig/HttpServices';

export const getHomeWorldDetails = createAsyncThunk(
  'homeWorldDetail/getHomeWorldDetail',
  async (payload, {getState, fulfillWithValue, rejectWithValue, dispatch}) => {
    try {
      const BAST_URL = payload?.url;
      const response = await HTTPService.getRequest(BAST_URL);
      if (response) {
        return fulfillWithValue({
          homeWorldData: response,
        });
      } else {
        return rejectWithValue({
          isFailed: true,
        });
      }
    } catch (error) {
      return rejectWithValue({
        isFailed: true,
      });
    }
  },
);

let initialState = {
  loading: false,
  error: null,
  success: false,
  homeWorldData: null,
};

export const homeWorldSlice = createSlice({
  name: 'homeWorldDetail',
  initialState: initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getHomeWorldDetails.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getHomeWorldDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.homeWorldData = action?.payload?.homeWorldData;
    });
    builder.addCase(getHomeWorldDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.homeWorldData = null;
    });
  },
});

const homeWorldDetailReducer = homeWorldSlice.reducer;

export const {reset: homeWorldReset} = homeWorldSlice.actions;

export default homeWorldDetailReducer;
