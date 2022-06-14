import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardMedia, Typography, Stack, Box } from '@mui/material'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import QualityBadge from './QualityBadge';
import { get500wImage } from '../utils/image';

const MovieThumbnail = ({ movieData, type }) => {
  return (
    <Link to={`/${type}/${movieData.id}`} style={{textDecoration: 'none', maxWidth: '200px'}}>
      <Card sx={{ borderRadius: '7px', position: 'relative', overflow: 'hidden', mb: 1 }}>
        <CardMedia
          component="img"
          height="250"
          image={get500wImage(movieData.poster_path) || ""}
          alt={movieData.title}
        />
        <QualityBadge text="HD" sx={{position: 'absolute', top: 0, margin: '10px', right: 0}} />
      </Card>
      <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>
        {movieData?.original_title || movieData?.original_name}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle2" sx={{ color: '#ffffff70' }}>    {movieData.release_date?.substring(0, 4) || movieData?.first_air_date?.substring(0, 4)}</Typography>
        {movieData?.original_language &&
          (
            <>
              <Icon icon="bi:dot" style={{color: '#fff'}} />
              <Typography variant="subtitle2" sx={{color: '#ffffff70', textTransform: 'uppercase'}}>
                {movieData?.original_language}
              </Typography>
            </>
          )
        }
        <Box sx={{borderRadius: '3px', border: '1px solid #fff', padding: '0 5px', display: 'flex', alignItems: 'center', height: '20px', ml: 'auto !important', textTransform: 'capitalize'}}>
          <Typography variant="caption" sx={{color: '#fff'}}>
            {type}
          </Typography>
        </Box>
      </Stack>
    </Link>
  )
}

MovieThumbnail.propTypes = {
  movieData: PropTypes.object,
  type: PropTypes.oneOf(['movie', 'tv']),
}

export default MovieThumbnail