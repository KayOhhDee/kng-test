const Tabs = () => {
  return {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none'
        },
        scroller: {
          display: 'flex',
          alignItems: 'center',
        }
      }
    }
  }
}

export default Tabs