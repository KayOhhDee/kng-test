import React from 'react'
import PropTypes from 'prop-types';
import { Skeleton, Grid, Stack } from '@mui/material';

const ThumbnailsSkeleton = ({ length }) => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="flex-start" spacing={2} my={4}>
      <Grid container spacing={2}>
        {Array.from({length: length || 18}).map((_, index) => (
          <Grid key={index} item xs={6} sm={4} md={2}>
            <Skeleton
              variant="rectangular"
              width="100%" height={250}
              sx={{ maxWidth: '200px', borderRadius: '7px' }}
              animation="pulse"
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

ThumbnailsSkeleton.propTypes = {
  length: PropTypes.number,
}

export default ThumbnailsSkeleton