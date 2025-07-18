import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, styled, Paper } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Pinpoint 📍
          </Typography>
          <Button color="inherit">Restaurants</Button>
          <Button color="inherit">Cafes</Button>
          <Button color="inherit">My Lists</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}