import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Divider, 
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  Autocomplete
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { curatedPlaces } from "../../data/curatedPlaces";

export default function Favorites() {
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [placeToDelete, setPlaceToDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deletedPlaceName, setDeletedPlaceName] = useState('');

  useEffect(() => {
    // Load liked places from localStorage
    const likedPlacesData = JSON.parse(localStorage.getItem('likedPlacesData') || '[]');
    const likedPlaceIds = likedPlacesData.map(item => item.id);
    const likedPlacesDataWithInfo = curatedPlaces.filter(place => likedPlaceIds.includes(place.id));
    
    // Add liked date and timestamp to each place
    const placesWithDates = likedPlacesDataWithInfo.map(place => {
      const likedData = likedPlacesData.find(item => item.id === place.id);
      return {
        ...place,
        likedDate: new Date(likedData.likedAt).toLocaleDateString(),
        likedTimestamp: likedData.likedAt
      };
    });
    
    // Sort by timestamp (most recent first)
    const sortedPlaces = placesWithDates.sort((a, b) => b.likedTimestamp - a.likedTimestamp);
    setLikedPlaces(sortedPlaces);
    
    // Extract all unique tags for filter
    const tags = [...new Set(likedPlacesDataWithInfo.flatMap(place => place.tags))];
    setAllTags(tags);
  }, []);

  // Filter places based on search term and selected tags
  const filteredPlaces = likedPlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => place.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleRemoveFavorite = (place) => {
    setPlaceToDelete(place);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (placeToDelete) {
      const updatedLikedPlaces = likedPlaces.filter(place => place.id !== placeToDelete.id);
      setLikedPlaces(updatedLikedPlaces);
      
      // Update localStorage
      const currentLikedData = JSON.parse(localStorage.getItem('likedPlacesData') || '[]');
      const updatedLikedData = currentLikedData.filter(item => item.id !== placeToDelete.id);
      localStorage.setItem('likedPlacesData', JSON.stringify(updatedLikedData));
      
      // Show success message
      setDeletedPlaceName(placeToDelete.name);
      setSnackbarOpen(true);
    }
    setDeleteDialogOpen(false);
    setPlaceToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setPlaceToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        pt: '80px', // Add padding top to account for header
        pb: 2,
      }}
    >
      <Container maxWidth="md" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Floating Search and Filter Section */}
        <Box sx={{ position: 'absolute', top: 90, left: '50%', transform: 'translateX(-50%)', width: { xs: 'calc(100% - 32px)', md: '95%' }, maxWidth: 1200, zIndex: 1000, pointerEvents: 'none' }}>
          <Box sx={{ pointerEvents: 'auto' }}>
            <Paper 
              sx={{ 
                borderRadius: '20px', 
                p: 1.5,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'saturate(180%) blur(20px)',
                WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                boxShadow: 3,
                width: { xs: '90%', sm: 500 },
              }}
            >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                placeholder="Search favorites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ 
                  flexGrow: 1,
                  '& .MuiInputBase-root': {
                    color: '#000000',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 1,
                  },
                  '& .MuiInputBase-input': {
                    color: '#000000',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#666666',
                    opacity: 1,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#666666' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                multiple
                options={allTags}
                value={selectedTags}
                onChange={(event, newValue) => setSelectedTags(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Filter tags..."
                    sx={{ 
                      minWidth: 200,
                      '& .MuiInputBase-root': {
                        color: '#000000',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: 1,
                      },
                      '& .MuiInputBase-input': {
                        color: '#000000',
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#666666',
                        opacity: 1,
                      },
                    }}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      variant="outlined"
                    />
                  ))
                }
                sx={{ minWidth: 200 }}
              />
            </Box>
          </Paper>
            </Box>
          </Box>

        {/* Favorites List */}
        <Paper elevation={3} sx={{ borderRadius: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', mt: 16, mb: 2, position: 'relative', zIndex: 1 }}>
          {filteredPlaces.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                {likedPlaces.length === 0 
                  ? "No favorites yet. Like some places on the map to see them here!" 
                  : "No favorites match your search criteria."}
              </Typography>
            </Box>
                      ) : (
              <List sx={{ p: 0, flexGrow: 1, overflow: 'auto' }}>
              {filteredPlaces.map((place, index) => (
                <React.Fragment key={place.id}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ p: 2 }}>
                      {/* Photo */}
                      <Avatar
                        src={place.photo}
                        variant="rounded"
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          mr: 2,
                          borderRadius: 1
                        }}
                      />
                      
                      {/* Content */}
                      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <ListItemText
                          primary={place.name}
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              {/* Tags */}
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                                {place.tags.map((tag, tagIndex) => (
                                  <Chip 
                                    key={tagIndex}
                                    label={tag} 
                                    size="small" 
                                    variant="outlined"
                                    sx={{ 
                                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                      fontSize: '0.75rem'
                                    }}
                                  />
                                ))}
                              </Box>
                              
                              {/* Date */}
                              <Typography variant="caption" color="text.secondary">
                                Added on {place.likedDate}
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                      
                      {/* Remove button */}
                      <IconButton
                        onClick={() => handleRemoveFavorite(place)}
                        sx={{ 
                          color: '#e91e63',
                          '&:hover': {
                            backgroundColor: 'rgba(233, 30, 99, 0.1)',
                          }
                        }}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  {index < filteredPlaces.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Remove from Favorites?
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove "{placeToDelete?.name}" from your favorites?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          "{deletedPlaceName}" has been removed from favorites
        </Alert>
      </Snackbar>
    </Box>
  );
} 