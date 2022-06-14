import { useEffect } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import { Container, Grid, Stack, Card, CardMedia, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import LoadingScreen from '../components/LoadingScreen';
import { getTVShow } from '../redux/slices/tvShows';
import QualityBadge from '../components/QualityBadge';
import { get500wImage } from '../utils/image';

const TVDetails = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { tvShows, isLoading } = useSelector(state => state.tvShows);

  useEffect(() => {
    dispatch(getTVShow(id));
  }, [dispatch, id]);


  const { tvShow } = tvShows;

  return (
    <Page title={tvShow?.name}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
      <Container>
        <Grid container spacing={3} mt={10}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: '#000' }}>
              <CardMedia
                component="img"
                image={get500wImage(tvShow?.poster_path)}
                alt={tvShow?.title}
                sx={{
                  height: 'calc(100vh - 140px)',
                  borderRadius: '7px',
                  border: '4px solid #ffffff3b'
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant='h3'>{tvShow?.original_name || 'N/A'}</Typography>
            <Stack direction="row" alignItems="center" spacing={2} mt={1}>
              <QualityBadge textColor="#000" bgColor="#2B899D" />
              <Stack direction="row" alignItems="center">
                <Icon style={{ fontSize: '16px', color: 'white', marginRight: '5px' }} icon="ant-design:star-filled" />
                <Typography variant="subtitle2">{tvShow?.vote_average || 'n/a'}</Typography>
              </Stack>
            </Stack>
            <Typography variant="body1" sx={{ fontWeight: 300, my: 3, opacity: 0.7 }}>{tvShow?.overview}</Typography>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Country:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{
                  tvShow?.production_countries.length ?
                    tvShow?.production_countries?.map((item, index) => (
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
                  tvShow?.genres.length ?
                    tvShow?.genres?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                }</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Authors:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{
                  tvShow?.created_by.length ?
                    tvShow?.created_by?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                }</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">First Released:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{tvShow?.first_air_date || 'n/a'}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Last Released:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{tvShow?.last_episode_to_air?.air_date || 'n/a'}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Production:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{
                  tvShow?.production_companies.length ?
                    tvShow?.production_companies?.map((item, index) => (
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
                  tvShow?.spoken_languages.length ?
                    tvShow?.spoken_languages?.map((item, index) => (
                      item.name
                    )).join(', ') : 'n/a'
                }</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Seasons: </Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{tvShow?.number_of_seasons || 'n/a'}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Episodes:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{tvShow?.number_of_episodes || 'n/a'}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Status:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{tvShow?.status || 'n/a'}</Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ opacity: 0.7 }}>
              <Grid item xs={3} md={2}>
                <Typography variant="body2">Tag line:</Typography>
              </Grid>
              <Grid item xs={9} md={10}>
                <Typography variant="body2">{tvShow?.tagline || 'n/a'}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      )}
    </Page>
  )
}

export default TVDetails