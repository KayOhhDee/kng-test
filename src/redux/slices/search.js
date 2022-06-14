import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  search: {
    main: [],
    totalPages: 0,
  }
}

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET SEARCH
    getSearchSuccess(state, action) {
      state.isLoading = false;
      state.search.main = action.payload.results;
      state.search.totalPages = action.payload.total_pages;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSearch({query, page}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/search/multi', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          query,
          page,
        }
      })
      dispatch(slice.actions.getSearchSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}