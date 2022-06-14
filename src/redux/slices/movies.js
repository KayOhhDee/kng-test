import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  movies: {
    home: [],
    main: [],
    movie: null,
    totalPages: 0,
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

    // GET HOME MOVIES
    getHomeMoviesSuccess(state, action) {
      state.isLoading = false;
      state.movies.home = action.payload;
    },

    // GET MAIN MOVIES
    getMainMoviesSuccess(state, action) {
      state.isLoading = false;
      state.movies.main = action.payload.results;
      state.movies.totalPages = action.payload.total_pages;
    },

    // GET MOVIE
    getMovieSuccess(state, action) {
      state.isLoading = false;
      state.movies.movie = action.payload;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getHomeMovies() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/movie/popular', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          page: 1
      }})
      dispatch(slice.actions.getHomeMoviesSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMainMovies(page) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/movie/popular', {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          page: page || 1
        }
      })
      dispatch(slice.actions.getMainMoviesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMovie(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_HOST_API_KEY,
          movie_id: id
        }
      })
      dispatch(slice.actions.getMovieSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

