import React from 'react'
import { Box } from '@mui/material'
import { Icon } from '@iconify/react';

const LoadingScreen = () => {
  return (
    <Box sx={{position: 'fixed', top: '70px', bottom: 0, right: 0, left: 0, background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Icon icon="icon-park:movie" style={{ fontSize: '70px' }} />
    </Box>
  )
}

export default LoadingScreen