import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@mui/material';

const QualityBadge = ({ text, sx, textColor, bgColor }) => {
  return (
    <Box sx={{
      ...sx,
      padding: '2px 6px',
      borderRadius: '4px',
      background: `${bgColor || '#fff'}`,
      width: 'fit-content',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    }}>
      <Typography variant="h6" sx={{color: `${textColor || '#000'}`, fontSize: '12px !important'}}>{text || 'HD'}</Typography>
    </Box>
  )
}

QualityBadge.propTypes = {
  text: PropTypes.string,
  sx: PropTypes.object,
  textColor: PropTypes.string,
  bgColor: PropTypes.string
}

export default QualityBadge