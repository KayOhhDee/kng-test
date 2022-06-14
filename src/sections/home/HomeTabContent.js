import React from 'react'
import PropTypes from 'prop-types'
import MovieThumbnail from '../../components/MovieThumbnail';
import ThumbnailsSkeleton from '../../components/skeleton/ThumbnailsSkeleton';
import { Stack, Grid } from '@mui/material';

const HomeTabContent = ({ movies, type, isLoading }) => {
  return (
    <>
      {
        isLoading ? (
          <ThumbnailsSkeleton />
        ) : (
          <Stack direction="row" flexWrap="wrap" justifyContent="flex-start" spacing={2} my={4}>
            <Grid container spacing={2}>
            {movies.map((movie, index) => (
                <Grid key={movie.id} item xs={6} sm={4} md={2}>
                  <MovieThumbnail type={type} movieData={movie} />
                </Grid>
            ))}
            </Grid>
          </Stack>
        )
      }
    </>
  )
}

HomeTabContent.propTypes = {
  movies: PropTypes.array,
  type: PropTypes.oneOf(['movie', 'tv']),
}

export default HomeTabContent