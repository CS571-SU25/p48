import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch
} from '@mui/material';
import { 
  Palette as PaletteIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import ThemeToggle from '../ThemeToggle';

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const [locationSharing, setLocationSharing] = React.useState(() => {
    return localStorage.getItem('locationSharing') === 'true';
  });

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: 'var(--bg-color, #f0f2f5)',
        pt: '80px',
        pb: 2,
        overflow: 'auto',
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
          Settings
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Theme Settings */}
          <Paper elevation={3} sx={{ borderRadius: '16px', p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Appearance
            </Typography>
            <ThemeToggle />
          </Paper>

          {/* Other Settings */}
          <Paper elevation={3} sx={{ borderRadius: '16px', p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
              Preferences
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Location Sharing" 
                  secondary="Allow Pinpoint to access your location for better recommendations"
                />
                <Switch
                  edge="end"
                  checked={locationSharing}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setLocationSharing(newValue);
                    localStorage.setItem('locationSharing', newValue.toString());
                  }}
                />
              </ListItem>
            </List>
          </Paper>

          {/* About Section */}
          <Paper elevation={3} sx={{ borderRadius: '16px', p: 3 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
              About
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Pinpoint helps you discover curated restaurants and cafes with expert recommendations, 
              free from promotional bias.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Version 1.0.0
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
} 