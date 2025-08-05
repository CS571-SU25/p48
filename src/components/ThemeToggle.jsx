import React from 'react';
import { 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Paper,
  Box
} from '@mui/material';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useTheme();

  const handleThemeChange = (event) => {
    setThemeMode(event.target.value);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
          Theme
        </FormLabel>
        <RadioGroup
          value={themeMode}
          onChange={handleThemeChange}
          name="theme-mode"
        >
          <FormControlLabel 
            value="system" 
            control={<Radio />} 
            label="System (Follows your device settings)" 
          />
          <FormControlLabel 
            value="light" 
            control={<Radio />} 
            label="Light" 
          />
          <FormControlLabel 
            value="dark" 
            control={<Radio />} 
            label="Dark" 
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
} 