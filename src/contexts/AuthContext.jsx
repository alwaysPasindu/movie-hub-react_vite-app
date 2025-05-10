import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/localStorage';

// Create context
const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

// Mock user data - in a real app, this would come from a backend API
const mockUsers = [
  { username: 'user', password: 'password', name: 'Demo User' },
  { username: 'admin', password: 'admin123', name: 'Admin User' },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (from local storage)
  useEffect(() => {
    const savedUser = storageService.get('USER');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (username, password) => {
    setError(null);
    
    // Find user in mock data
    const user = mockUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Create a safe user object (without password)
      const safeUser = {
        username: user.username,
        name: user.name,
      };
      
      // Save to state and localStorage
      setCurrentUser(safeUser);
      storageService.set('USER', safeUser);
      return true;
    } else {
      setError('Invalid username or password');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    storageService.remove('USER');
  };

  // Context value
  const value = {
    currentUser,
    login,
    logout,
    error,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};