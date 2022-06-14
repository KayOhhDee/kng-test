import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  genres: {
    moviesGenres: [],
    tvShowsGenres: []
  }
}

const slice = createSlice({
  name: 'movies',
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

    // GET MOVIES GENRES
    getMoviesGenresSuccess(state, action) {
      state.isLoading = false;
      state.genres.moviesGenres = action.payload;
    },

    // GET MOVIES GENRES
    getTVShowsGenresSuccess(state, action) {
      state.isLoading = false;
      state.genres.tvShowsGenres = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// -----------------------------------------------------------------

export function getMoviesGenres() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/genre/movie/list', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY
        }
      })
      dispatch(slice.actions.getMoviesGenresSuccess(response.data.genres));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTVShowsGenres() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/genre/tv/list', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY
        }
      })
      dispatch(slice.actions.getTVShowsGenresSuccess(response.data.genres));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}