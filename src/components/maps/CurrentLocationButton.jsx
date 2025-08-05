import React, { useState } from 'react';
import { 
  Fab, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Alert
} from '@mui/material';
import { MyLocation as MyLocationIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function CurrentLocationButton({ onLocationFound }) {
  const navigate = useNavigate();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkLocationPermission = () => {
    const locationSharing = localStorage.getItem('locationSharing') === 'true';
    return locationSharing;
  };

  const handleLocationClick = async () => {
    if (!checkLocationPermission()) {
      setShowPermissionDialog(true);
      return;
    }

    setIsLoading(true);
    
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      onLocationFound([latitude, longitude]);
    } catch (error) {
      console.error('Error getting location:', error);
      // You could show an error snackbar here
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowPermissionDialog(false);
  };

  const handleGoToSettings = () => {
    setShowPermissionDialog(false);
    // Navigate to settings page using React Router
    navigate('/settings');
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="current location"
        onClick={handleLocationClick}
        disabled={isLoading}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: '#333',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          },
        }}
      >
        <MyLocationIcon />
      </Fab>

      <Dialog
        open={showPermissionDialog}
        onClose={handleCloseDialog}
        aria-labelledby="location-permission-dialog-title"
      >
        <DialogTitle id="location-permission-dialog-title">
          Location Access Required
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            To use the current location feature, you need to enable location sharing in settings.
          </Alert>
          <Typography>
            Please go to Settings and turn on the "Location Sharing" toggle to use this feature.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleGoToSettings} variant="contained" color="primary">
            Go to Settings
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 