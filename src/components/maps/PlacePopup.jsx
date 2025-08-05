import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const PlacePopup = ({ place }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Load liked status from localStorage
    const likedPlaces = JSON.parse(localStorage.getItem('likedPlaces') || '[]');
    setIsLiked(likedPlaces.includes(place.id));
  }, [place.id]);

  const handleHeartClick = () => {
    const likedPlaces = JSON.parse(localStorage.getItem('likedPlaces') || '[]');
    
    if (isLiked) {
      // Remove from liked places
      const updatedLikedPlaces = likedPlaces.filter(id => id !== place.id);
      localStorage.setItem('likedPlaces', JSON.stringify(updatedLikedPlaces));
      setIsLiked(false);
    } else {
      // Add to liked places
      const updatedLikedPlaces = [...likedPlaces, place.id];
      localStorage.setItem('likedPlaces', JSON.stringify(updatedLikedPlaces));
      setIsLiked(true);
    }
  };

  return (
    <Card sx={{ 
      width: 300, 
      maxWidth: '90vw',
      borderRadius: 2,
      boxShadow: 3,
      position: 'relative'
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={place.photo}
          alt={place.name}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          onClick={handleHeartClick}
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            color: isLiked ? '#e91e63' : '#666',
          }}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
      
      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {place.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 1.5, lineHeight: 1.4 }}
        >
          {place.description}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          <Chip 
            label={place.type} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
          {place.tags.slice(0, 2).map((tag, index) => (
            <Chip 
              key={index}
              label={tag} 
              size="small" 
              variant="outlined"
              sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlacePopup; 