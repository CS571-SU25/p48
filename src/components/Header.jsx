import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

export default function Header({ onHomeClick, onMapsClick }) {
  return (
    <AppBar 
      position="fixed" 
      sx={{
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: { xs: 'calc(100% - 32px)', md: '95%' },
        maxWidth: 1200,
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      <Toolbar>
        <Button 
          onClick={onHomeClick} 
          sx={{ textTransform: 'none', p: 0, '&:hover': { backgroundColor: 'transparent' } }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'text.primary'
            }}
          >
            Pinpoint 📍
          </Typography>
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={onMapsClick} sx={{ color: 'text.primary' }}>Maps</Button>
        <Button sx={{ color: 'text.primary' }}>My Lists</Button>
      </Toolbar>
    </AppBar>
  );
}