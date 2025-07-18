import { Box, Typography, Button } from '@mui/material';
import mapVideo from '../assets/map.mp4';
import { Link } from 'react-router';

export default function MainPage() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          top: 0,
          left: 0,
          filter: 'blur(8px)',
        }}
      >
        <source src={mapVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 1,
          color: 'white',
          p: 3,
        }}
      >
        {/* <Box
          component="img"
          sx={{
            width: 'clamp(180px, 40vw, 300px)',
            height: 'auto',
            mb: 4,
          }}
          alt="Pinpoint Logo"
          src="https://placehold.co/400x400/FFFFFF/000000?text=Pinpoint%0ALogo&font=raleway"
        /> */}

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          >
            Discover Your Space.
          </Typography>
          <Typography variant="h5" component="p" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Pinpoint helps you find reliable places, curated by experts.
            Say goodbye to biased reviews and paid ads.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/maps"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: 'rgb(0, 0, 0)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          Start
        </Button>
      </Box>
    </Box>
  );
}