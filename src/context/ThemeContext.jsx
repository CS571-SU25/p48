import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('system');

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('themeMode') || 'system';
    setThemeMode(savedTheme);
  }, []);

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('themeMode', themeMode);
    
    // Apply theme to document
    const root = document.documentElement;
    
    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', systemTheme);
    } else {
      root.setAttribute('data-theme', themeMode);
    }

    // Also apply theme to body for immediate effect
    if (themeMode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.body.style.backgroundColor = systemTheme === 'dark' ? '#121212' : '#ffffff';
      document.body.style.color = systemTheme === 'dark' ? '#ffffff' : '#000000';
    } else {
      document.body.style.backgroundColor = themeMode === 'dark' ? '#121212' : '#ffffff';
      document.body.style.color = themeMode === 'dark' ? '#ffffff' : '#000000';
    }
  }, [themeMode]);

  const value = {
    themeMode,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 