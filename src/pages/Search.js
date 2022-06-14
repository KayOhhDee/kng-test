import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../redux/store';
import { Container, Typography, Divider, Grid, Stack, Box, Pagination } from '@mui/material';
import useQuery from '../hooks/useQuery';
import Page from '../components/Page';
import MovieThumbnail from '../components/MovieThumbnail'
import { getSearch } from '../redux/slices/search';
import ThumbnailsSkeleton from '../components/skeleton/ThumbnailsSkeleton';

const Search = () => {
  let query = useQuery();

  let queryString = query.get('q');

  const [page, setPage] = useState(1);

  const { search, isLoading } = useSelector((state) => state.search);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearch({page, query: queryString}));
  }, [dispatch, page, queryString]);

  const { main, totalPages } = search;

  return (
    <Page title={queryString}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: 300, mt: 9, pt: 4 }}>Results for {queryString}</Typography>
        <Divider sx={{ borderColor: '#ffffff50', width: '80px' }} />

        {isLoading ? (
          <ThumbnailsSkeleton />
        ) : (
          <Stack direction="row" flexWrap="wrap" justifyContent="flex-start" spacing={2} my={4}>
            <Grid container spacing={2}>
              {main.map((movie, index) => (
                <Grid key={movie.id} item xs={6} sm={4} md={2}>
                  <MovieThumbnail type={movie?.media_type} movieData={movie} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )
        }
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Pagination count={totalPages || 1} page={page} onChange={handleChange} />
        </Box>
      </Container>
    </Page>
  )
}

export default Search