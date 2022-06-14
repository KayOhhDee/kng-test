import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Container, Typography, Stack, InputBase } from '@mui/material';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'

const NavLinkStyle = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  textShadow: '2px 4px 3px rgba(0, 0, 0, 0.3)',
  fontWeight: '300',
  '&:hover': {
    color: 'inherit',
    textDecoration: 'underline',
  },
  fontSize: '16px !important',
  opacity: 0.9
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} sx={{backgroundColor: 'transparent', zIndex: 10, position: 'absolute'}}>
        <Container>
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" spacing={4}>
              <NavLinkStyle to="/">
                <Typography variant="body1">Home</Typography>
              </NavLinkStyle>
              <NavLinkStyle to="/movies">
                <Typography variant="body1">Movies</Typography>
              </NavLinkStyle>
              <NavLinkStyle to="/tv">
                <Typography variant="body1">TV</Typography>
              </NavLinkStyle>
              <Search>
                <SearchIconWrapper>
                  <Icon icon="akar-icons:search" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      navigate(`/search/?q=${e.target.value}`)
                    }
                  }}
                />
              </Search>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Header