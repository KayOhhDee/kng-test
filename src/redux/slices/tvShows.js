import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  tvShows: {
    home: [],
    main: [],
    tvShow: null,
    totalPages: 0,
  }
}

const slice = createSlice({
  name: 'tvShows',
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

    // GET HOME TV SHOWS
    getHomeTVShowsSuccess(state, action) {
      state.isLoading = false;
      state.tvShows.home = action.payload;
    },

    // GET MAIN TV SHOWS
    getMainTVShowsSuccess(state, action) {
      state.isLoading = false;
      state.tvShows.main = action.payload.results;
      state.tvShows.totalPages = action.payload.total_pages;
    },

    // GET TV SHOW
    getTVShowSuccess(state, action) {
      state.isLoading = false;
      state.tvShows.tvShow = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getHomeTVShows() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/tv/popular', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          page: 1
        },
      });
      dispatch(slice.actions.getHomeTVShowsSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMainTVShows(page) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/tv/popular', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          page: page || 1
        },
      });
      dispatch(slice.actions.getMainTVShowsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getTVShow(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/tv/${id}`, {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          tv_id: id
        }
      })
      dispatch(slice.actions.getTVShowSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

