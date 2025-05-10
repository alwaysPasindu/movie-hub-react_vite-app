import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/localStorage';

// Create context
const ThemeContext = createContext();

// Custom hook for using theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or default to light
  const getInitialTheme = () => {
    const savedTheme = storageService.get('THEME');
    
    // If theme is saved in localStorage, use it
    if (savedTheme) {
      return savedTheme === 'dark' ? 'dark' : '';
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light theme
    return '';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Update localStorage when theme changes
  useEffect(() => {
    storageService.set('THEME', theme);
    
    // Add or remove 'dark' class from document.documentElement
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? '' : 'dark'));
  };

  // Value for the context provider
  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};