import React from 'react';
import { Box, Chip } from '@mui/material';
import { Restaurant as RestaurantIcon, LocalCafe as CafeIcon } from '@mui/icons-material';

export default function MapFilter({ selectedFilters, onFilterChange }) {
  const handleFilterToggle = (filterType) => {
    const newFilters = selectedFilters.includes(filterType)
      ? selectedFilters.filter(f => f !== filterType)
      : [...selectedFilters, filterType];
    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
      <Chip
        icon={<RestaurantIcon />}
        label="Restaurant"
        onClick={() => handleFilterToggle('Restaurant')}
        variant={selectedFilters.includes('Restaurant') ? 'filled' : 'outlined'}
        color={selectedFilters.includes('Restaurant') ? 'primary' : 'default'}
        sx={{
          backgroundColor: selectedFilters.includes('Restaurant') 
            ? 'rgba(255, 255, 255, 0.97)' 
            : 'rgba(255, 255, 255, 0.5)',
          color: selectedFilters.includes('Restaurant') ? '#333' : '#666',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255)',
          },
        }}
      />
      <Chip
        icon={<CafeIcon />}
        label="Cafe"
        onClick={() => handleFilterToggle('Cafe')}
        variant={selectedFilters.includes('Cafe') ? 'filled' : 'outlined'}
        color={selectedFilters.includes('Cafe') ? 'primary' : 'default'}
        sx={{
          backgroundColor: selectedFilters.includes('Cafe') 
            ? 'rgba(255, 255, 255, 0.97)' 
            : 'rgba(255, 255, 255, 0.5)',
          color: selectedFilters.includes('Cafe') ? '#333' : '#666',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255)',
          },
        }}
      />
    </Box>
  );
} 