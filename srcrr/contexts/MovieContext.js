import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastSearch, setLastSearch] = useState(() => localStorage.getItem('lastSearch') || '');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  const addFavorite = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};