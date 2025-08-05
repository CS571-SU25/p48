import React, { useState } from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Share as ShareIcon,
  Map as MapIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';

export default function ShareButton({ place }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoogleMapsSearch = () => {
    const searchTerm = place.address ? `${place.name}, ${place.address}` : `${place.name}, Madison, WI`;
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    window.open(`https://www.google.com/maps/place/${encodedSearchTerm}`, '_blank');
    handleClose();
  };

  const handleCopyAddress = async () => {
    const address = place.address ? `${place.name}, ${place.address}` : `${place.name}, Madison, WI`;
    try {
      await navigator.clipboard.writeText(address);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
              <IconButton
          onClick={handleClick}
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 56, // Position to the left of the heart button
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            color: '#333',
          }}
        >
          <ShareIcon />
        </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleGoogleMapsSearch}>
          <ListItemIcon>
            <MapIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Search in Google Maps</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCopyAddress}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy the Address</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Address copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
} 