import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/api';
import { storageService } from '../services/localStorage';

// Create context
const MovieContext = createContext();

// Custom hook for using movie context
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // State
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = storageService.get('FAVORITES') || [];
    setFavorites(savedFavorites);
    
    // Load last search
    const lastSearch = storageService.getLastSearch();
    if (lastSearch && lastSearch.query) {
      setSearchQuery(lastSearch.query);
    }
    
    // Fetch genres
    fetchGenres();
  }, []);

  // Fetch trending movies
  const fetchTrending = useCallback(async (resetPage = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentPage = resetPage ? 1 : page;
      const data = await movieService.getTrending(currentPage);
      
      if (resetPage) {
        setTrending(data.results);
      } else {
        setTrending(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
      setHasMore(currentPage < data.total_pages);
      if (resetPage) {
        setPage(1);
      } else {
        setPage(currentPage + 1);
      }
    } catch (err) {
      setError('Failed to fetch trending movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Fetch genres
  const fetchGenres = async () => {
    try {
      const data = await movieService.getGenres();
      setGenres(data.genres || []);
    } catch (err) {
      console.error('Failed to fetch genres:', err);
    }
  };

  // Search movies
  const searchMovies = useCallback(async (query, resetPage = false) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchQuery('');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const currentPage = resetPage ? 1 : page;
      const data = await movieService.searchMovies(query, currentPage);
      
      if (resetPage) {
        setSearchResults(data.results);
      } else {
        setSearchResults(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
      setHasMore(currentPage < data.total_pages);
      
      if (resetPage) {
        setPage(1);
      } else {
        setPage(currentPage + 1);
      }
      
      setSearchQuery(query);
      storageService.saveLastSearch(query);
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Load more results (for infinite scroll or Load More button)
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    if (searchQuery) {
      searchMovies(searchQuery, false);
    } else {
      fetchTrending(false);
    }
  }, [loading, hasMore, searchQuery, searchMovies, fetchTrending]);

  // Toggle favorite
  const toggleFavorite = (movie) => {
    if (storageService.isFavorite(movie.id)) {
      const updatedFavorites = storageService.removeFavorite(movie.id);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = storageService.addFavorite(movie);
      setFavorites(updatedFavorites);
    }
  };

  // Check if a movie is favorite
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // Context value
  const value = {
    trending,
    searchResults,
    favorites,
    loading,
    error,
    searchQuery,
    page,
    totalPages,
    hasMore,
    genres,
    fetchTrending,
    searchMovies,
    loadMore,
    toggleFavorite,
    isFavorite,
    clearSearch: () => {
      setSearchResults([]);
      setSearchQuery('');
      setPage(1);
    }
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};