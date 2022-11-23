import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { commands, root, timers } from '../urls';

const Base: React.FC = () => (
  <React.Fragment>
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6">twentytwobot</Typography>
        <Box display="flex" flexGrow={1} marginLeft={2}>
          <Button component={Link} sx={{ color: 'white' }} to={root()}>
            Home
          </Button>
          <Button component={Link} sx={{ color: 'white' }} to={commands()}>
            Commands
          </Button>
          <Button component={Link} sx={{ color: 'white' }} to={timers()}>
            Timers
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
    <Box marginY={2}>
      <Container component="main">
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  </React.Fragment>
);

export default Base;
