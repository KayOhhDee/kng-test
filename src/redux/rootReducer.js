import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import moviesReducer from './slices/movies';
import tvShowsReducer from './slices/tvShows';
import genresReducer from './slices/genres';
import searchReducer from './slices/search';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  genres: genresReducer,
  search: searchReducer,
});

export { rootPersistConfig, rootReducer };
