import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

const Loadable = (Component) => (props) => {

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <PageLayout />,
      children: [
        { element: <Navigate to="/home" replace />, index: true },
        { path: 'home', element: <Home /> },
        { path: 'movies', element: <Movies /> },
        { path: 'tv', element: <TV /> },
        { path: 'movie/:id', element: <MovieDetails /> },
        { path: 'tv/:id', element: <TVDetails /> },
        { path: 'search', element: <Search /> },
        { path: '404', element: <Page404 /> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// Layout
const PageLayout = Loadable(lazy(() => import('./layouts/main')));

// HOME
const Home = Loadable(lazy(() => import('./pages/Home')));

// MOVIES
const Movies = Loadable(lazy(() => import('./pages/Movies')));
const MovieDetails = Loadable(lazy(() => import('./pages/MovieDetails')));

// TV
const TV = Loadable(lazy(() => import('./pages/TV')));
const TVDetails = Loadable(lazy(() => import('./pages/TVDetails')));

// SEARCH
const Search = Loadable(lazy(() => import('./pages/Search')));

// 404
const Page404 = Loadable(lazy(() => import('./pages/Page404')));
