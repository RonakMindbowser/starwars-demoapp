import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import HTTPService from '../../networkConfig/HttpServices';

export const getCharDetails = createAsyncThunk(
  'charDetail/getCharDetail',
  async (payload, {getState, fulfillWithValue, rejectWithValue, dispatch}) => {
    try {
      const BAST_URL = payload?.url;
      const response = await HTTPService.getRequest(BAST_URL);
      if (response) {
        return fulfillWithValue({
          charData: response,
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
  charData: null,
};

export const charDetailSlice = createSlice({
  name: 'charDetail',
  initialState: initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getCharDetails.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getCharDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.charData = action?.payload?.charData;
    });
    builder.addCase(getCharDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.charData = null;
    });
  },
});

const charDetailReducer = charDetailSlice.reducer;

export const {reset: charDetailReset} = charDetailSlice.actions;

export default charDetailReducer;
