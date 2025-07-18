import React from 'react';
import { Paper, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';

export default function SearchSuggestions({ suggestions, onSuggestionClick }) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <Paper sx={{
      mt: 1,
      width: { xs: '90%', sm: 400 },
      maxHeight: 300,
      overflow: 'auto',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    }}>
      <List sx={{ p: 0 }}>
        {suggestions.map((suggestion, index) => (
          <React.Fragment key={suggestion.place_id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => onSuggestionClick(suggestion)}>
                <ListItemText primary={suggestion.display_name} />
              </ListItemButton>
            </ListItem>
            {index < suggestions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}