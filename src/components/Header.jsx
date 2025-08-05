import { Link } from 'react-router';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

export default function Header() {
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
          component={Link}
          to="/"
          sx={{ textTransform: 'none', p: 0, '&:hover': { backgroundColor: 'transparent' } }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            Pinpoint
          </Typography>
        </Button>

        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/maps" sx={{ color: 'text.primary' }}>Maps</Button>
        <Button component={Link} to="/lists" sx={{ color: 'text.primary' }}>Favorites</Button>
        <Button component={Link} to="/settings" sx={{ color: 'text.primary' }}>Settings</Button>
      </Toolbar>
    </AppBar>
  );
}