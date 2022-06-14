import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { useSelector } from '../../redux/store';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Stack, Container, MobileStepper, Typography, Box, Button } from '@mui/material';
import { Icon } from '@iconify/react';
import { getOriginalImage } from '../../utils/image';

const ContentContainerStyle = styled(Box)(() => ({
  position: 'absolute',
  maxWidth: '600px',
  padding: '3rem 0',
  width: '100%',
  bottom: 0,
  zIndex: 3
}));

const MobileStepperStyle = styled(MobileStepper)(() => ({
  backgroundColor: 'transparent',
  position: 'absolute',
  bottom: 0,
  justifyContent: 'center',
  left: 0,
  right: 0,
  zIndex: 3,
}));

const ImageContainerStyle = styled(Box)(() => ({
  '&::before': {
    content: '""',
    position:' absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    Zindex: 1,
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 35%, rgba(0,0,0,0.7483368347338936) 100%)'
  }
}));

const TitleStyle = styled(Typography)(({ theme }) => ({
  fontSize: '35px !important',
  fontWeight: 700,
  lineHeight: 1.2,
  textShadow: '2px 4px 3px rgba(0, 0, 0, 0.3)',
  marginBottom: '0.3rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px !important',
  },
}));

const RatingStyle = styled(Typography)(({ theme }) => ({
  fontSize: '16px !important',
  fontWeight: 700,
  textShadow: '2px 4px 3px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px !important',
  },
}));

const DescriptionStyle = styled(Typography)(({ theme }) => ({
  fontSize: '16px !important',
  fontWeight: 300,
  opacity: 0.7,
  marginBottom: '3rem',
  textShadow: '1px 1px 2px #111',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px !important',
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.primary.light}`,
  fontSize: '14px',
  borderRadius: '1rem',
  padding: '2px 14px',
  [theme.breakpoints.up('lg')]: {

  },
}));

const VerticalGradient = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 65%)',
  position: 'absolute',
  height: '200px',
  width: '100%',
  bottom: 0,
  [theme.breakpoints.up('lg')]: {

  },
}));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// const AutoPlaySwipeableViews = SwipeableViews;


const HomeCarousel = () => {
  const { home,/* isLoading */ } = useSelector((state) => state.movies.movies);
  const { moviesGenres,/* isLoading */ } = useSelector((state) => state.genres.genres);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 10 || home.length;


  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1, height: "85vh", position: "relative" }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={5000}
      >
        {(home?.slice(0, 10) || []).map((step, index) => (
          <div key={step.id} style={{position: 'relative'}}>
            <Container>
              <ContentContainerStyle>
                <TitleStyle variant="h5" component="h2">{step.original_title}</TitleStyle>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  sx={{ mb: 1 }}
                >
                  <Stack direction="row" alignItems="center">
                    <Icon style={{ fontSize: '18px', color: 'white', marginRight: '5px' }} icon="ant-design:star-filled" />
                    <RatingStyle variant="h6" component="h6">{step.vote_average}</RatingStyle>
                  </Stack>
                  <Typography variant="subtitle2">{step.release_date.substring(0, 4)}</Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {
                      (step.genre_ids || []).map((genre, index) => (
                        <Typography variant="subtitle2" key={index}>        {moviesGenres.find((item) => item.id === genre)?.name}
                        </Typography>
                      ))
                    }
                  </Stack>
                </Stack>
                <DescriptionStyle variant="body1" component="p">{step.overview}</DescriptionStyle>
                <Link to={`/movie/${step.id}`} style={{ textDecoration: 'none' }}>
                  <ButtonStyle
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Icon style={{ fontSize: '18px' }} icon="ant-design:read-outlined" />}
                  >Read more</ButtonStyle>
                </Link>
              </ContentContainerStyle>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ position: 'absolute', bottom: 0, width: '100%', left: 0, zIndex: 3 }}
              >
              </Stack>
            </Container>
            <VerticalGradient />
            {Math.abs(activeStep - index) <= 2 ? (
              <ImageContainerStyle>
                <Box
                  component="img"
                  sx={{
                    height: "85vh",
                    display: 'block',
                    overflow: 'hidden',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  src={getOriginalImage(step.backdrop_path)}
                  alt={step.title}
                />
              </ImageContainerStyle>
              ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepperStyle
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
      />
    </Box>
  );
}

export default HomeCarousel