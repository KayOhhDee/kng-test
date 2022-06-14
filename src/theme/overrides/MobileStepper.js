const MobileStepper = () => {
  return {
    MuiMobileStepper: {
      styleOverrides: {
        dot: {
          backgroundColor: 'rgba(162, 162, 162, 0.5)',
          width: '10px',
          height: '10px',
          margin: '0 5px'
        },
        dotActive: {
          backgroundColor: '#2B899D',
        }
      }
    }
  }
}

export default MobileStepper