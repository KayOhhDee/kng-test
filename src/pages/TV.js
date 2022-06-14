import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { Container, Typography, Divider, Grid, Stack, Pagination, Box } from '@mui/material'
import Page from '../components/Page'
import MovieThumbnail from '../components/MovieThumbnail'
import { getMainTVShows } from '../redux/slices/tvShows';
import ThumbnailsSkeleton from '../components/skeleton/ThumbnailsSkeleton';

const TV = () => {
  const [page, setPage] = useState(1);

  const { tvShows, isLoading } = useSelector((state) => state.tvShows);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainTVShows(page));
  }, [dispatch, page]);

  const { main, totalPages } = tvShows;

  return (
    <Page title="TV Shows">
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 300, mt: 9, pt: 4 }}>TV Shows</Typography>
        <Divider sx={{ borderColor: '#ffffff50', width: '80px' }} />

        { isLoading ? (
            <ThumbnailsSkeleton />
          ) : (
            <Stack direction="row" flexWrap="wrap" justifyContent="flex-start" spacing={2} my={4}>
              <Grid container spacing={2}>
                {main.map((movie, index) => (
                  <Grid key={movie.id} item xs={6} sm={4} md={2}>
                    <MovieThumbnail type="tv" movieData={movie} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )
        }
        <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
          <Pagination count={totalPages || 1} page={page} onChange={handleChange} />
        </Box>
      </Container>
    </Page>
  )
}

export default TV