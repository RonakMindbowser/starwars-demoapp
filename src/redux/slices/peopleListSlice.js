import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {requestCompleted, requestStarted} from './appSlice';
import HTTPService from '../../networkConfig/HttpServices';
import {Endpoints} from '../../networkConfig/Endpoints';

export const getAllPeopleList = createAsyncThunk(
  'peopleList/getAll',
  async (payload, {getState, fulfillWithValue, rejectWithValue, dispatch}) => {
    try {
      if (!payload?.isPagination) {
        dispatch(requestStarted());
      }

      let nextUrl = payload?.nextUrl;

      const BAST_URL = nextUrl
        ? nextUrl
        : payload?.isSearch
        ? `${Endpoints.baseUrl}${Endpoints.people}?search=${payload?.value}`
        : Endpoints.baseUrl + Endpoints.people;
      const response = await HTTPService.getRequest(BAST_URL);
      dispatch(requestCompleted());

      if (response?.results) {
        return fulfillWithValue({
          list: response?.results,
          count: response?.count,
          nextLink: response?.next,
        });
      } else {
        return rejectWithValue({
          isFailed: true,
        });
      }
    } catch (error) {
      dispatch(requestCompleted());
      return rejectWithValue({
        isFailed: true,
      });
    }
  },
);

let initialState = {
  loading: false,
  peopleList: [],
  error: null,
  success: false,
  count: 0,
  nextLink: '',
};

export const peopleListSlice = createSlice({
  name: 'peopleList',
  initialState: initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {
    builder.addCase(getAllPeopleList.pending, (state, action) => {
      state.loading = true;
      state.peopleList = [];
      state.error = null;
      state.success = false;
      state.count = 0;
      state.nextLink = '';
    });
    builder.addCase(getAllPeopleList.fulfilled, (state, action) => {
      state.loading = false;
      state.peopleList = action?.payload?.list;
      state.error = null;
      state.success = true;
      state.count = action?.payload?.count;
      state.nextLink = action?.payload?.nextLink;
    });
    builder.addCase(getAllPeopleList.rejected, (state, action) => {
      state.loading = false;
      state.peopleList = [];
      state.error = action?.payload?.error || null;
      state.success = false;
      state.count = 0;
      state.nextLink = '';
    });

    //Default Case
    builder.addDefaultCase((state, action) => {
      state.loading = false;
      state.peopleList = [];
      state.error = null;
      state.success = false;
    });
  },
});

const peopleListReducer = peopleListSlice.reducer;

export const {reset: peopleListReset} = peopleListSlice.actions;

export default peopleListReducer;
