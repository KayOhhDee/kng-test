import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import { Container, Grid, Stack, Card, CardMedia, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import LoadingScreen from '../components/LoadingScreen';
import { getMovie } from '../redux/slices/movies';
import QualityBadge from '../components/QualityBadge';
import { get500wImage } from '../utils/image';

const MovieDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { movies, isLoading } = useSelector(state => state.movies);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    dispatch(getMovie(id));
  }, [dispatch, id]);

  const { movie } = movies;

  return (
    <Page title={movie?.title}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container>
          <Grid container spacing={3} mt={10}>
            <Grid item xs={12} sm={4}>
              <Card sx={{backgroundColor: '#000'}}>
                <CardMedia
                  component="img"
                  image={get500wImage(movie?.poster_path)}
                  alt={movie?.title}
                  sx={{
                    height: 'calc(100vh - 140px)',
                    borderRadius: '7px',
                    border: '4px solid #ffffff3b'
                  }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant='h3'>{movie?.original_title || 'N/A'}</Typography>
              <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                <QualityBadge textColor="#000" bgColor="#2B899D" />
                <Stack direction="row" alignItems="center">
                  <Icon style={{ fontSize: '16px', color: 'white', marginRight: '5px' }} icon="ant-design:star-filled" />
                  <Typography variant="subtitle2">{movie?.vote_average || 'n/a'}</Typography>
                </Stack>
                <Typography variant="subtitle2">{movie?.runtime || 'n/a'} mins</Typography>
              </Stack>
              <Typography variant="body1" sx={{fontWeight: 300, my: 3, opacity: 0.7}}>{movie?.overview}</Typography>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Country:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{
                    movie?.production_countries.length ?
                    movie?.production_countries?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                  }</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Genre:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{
                    movie?.genres.length ?
                    movie?.genres?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                  }</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Release:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{movie?.release_date || 'n/a'}</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Production:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{
                    movie?.production_companies.length ?
                    movie?.production_companies?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                  }</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Languages:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{
                    movie?.spoken_languages.length ?
                    movie?.spoken_languages?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                }</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Budget:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{
                    movie?.budget ?
                    `$${numberWithCommas(movie?.budget)}` : 'n/a'
                  }</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Revenue:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{
                    movie?.revenue ?
                    `$${numberWithCommas(movie?.revenue)}` : 'n/a'
                  }</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Status:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{movie?.status || 'n/a'}</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ opacity: 0.7 }}>
                <Grid item xs={3} md={2}>
                  <Typography variant="body2">Tag line:</Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Typography variant="body2">{movie?.tagline || 'n/a'}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  )
}

export default MovieDetails