import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '../../redux/store';
import { Container, Typography, Divider, Stack, Box, Tabs, Tab, Button } from '@mui/material'
import HomeTabContent from './HomeTabContent';
import { Icon } from '@iconify/react';

const HomeRecommended = () => {
  const [currentTab, setCurrentTab] = useState('Movies');
  const [currentTabLink, setCurrentTabLink] = useState('/movies');

  const movies = useSelector(state => state.movies);
  const tvShows = useSelector(state => state.tvShows);

  const mTabs = [
    {
      value: 'Movies',
      component: <HomeTabContent movies={movies.movies.home} type="movie" isLoading={movies.isLoading} />
    },
    {
      value: 'TV Shows',
      component: <HomeTabContent movies={tvShows.tvShows.home} type="tv" isLoading={tvShows.isLoading} />
    }
  ]

  useEffect(() => {
    if (currentTab === 'Movies') {
      setCurrentTabLink('/movies');
    } else if (currentTab === 'TV Shows') {
      setCurrentTabLink('/tv');
    } else {
      setCurrentTabLink('/');
    }
  }, [currentTab])

  return (
    <Container>
      <Stack direction="row" alignItems="center" mt={5} spacing={3}>
        <Typography variant="h3" sx={{fontWeight: 300}}>Recommended</Typography>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="fullWidth"
          allowScrollButtonsMobile
          onChange={(e, value) => {
            setCurrentTab(value)
          }}
        >
          {mTabs.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.value}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Stack>
      <Divider sx={{ borderColor: '#ffffff50', width: '80px'}} />
      {mTabs.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Link to={currentTabLink} style={{textDecoration: 'none'}}>
          <Button variant='outlined' endIcon={<Icon icon="bi:arrow-right"/>}>
            View All
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default HomeRecommended