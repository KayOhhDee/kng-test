import { useEffect } from 'react'
import { useDispatch } from '../redux/store';
import { getHomeMovies } from '../redux/slices/movies';
import { getHomeTVShows } from '../redux/slices/tvShows';
import { getMoviesGenres } from '../redux/slices/genres';
// sections
import Page from '../components/Page';
// components
import HomeCarousel from '../sections/home/HomeCarousel';
import HomeRecommended from '../sections/home/HomeRecommended';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesGenres());
    dispatch(getHomeMovies());
    dispatch(getHomeTVShows());
  }, [dispatch]);

  return (
    <Page title="Home">
      <HomeCarousel />
      <HomeRecommended />
    </Page>
  )
}

export default Home