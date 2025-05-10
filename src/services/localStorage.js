// Local storage keys
const KEYS = {
  FAVORITES: 'moviedb_favorites',
  LAST_SEARCH: 'moviedb_last_search',
  THEME: 'moviedb_theme',
  USER: 'moviedb_user',
};

// Local storage service
export const storageService = {
  // Get item with JSON parse
  get: (key) => {
    try {
      const item = localStorage.getItem(KEYS[key]);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  },

  // Set item with JSON stringify
  set: (key, value) => {
    try {
      localStorage.setItem(KEYS[key], JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error setting to localStorage:', error);
      return false;
    }
  },

  // Remove item from storage
  remove: (key) => {
    try {
      localStorage.removeItem(KEYS[key]);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  },

  // Add a movie to favorites
  addFavorite: (movie) => {
    try {
      const favorites = storageService.get('FAVORITES') || [];
      // Check if movie already exists in favorites
      if (!favorites.some(favorite => favorite.id === movie.id)) {
        favorites.push(movie);
        storageService.set('FAVORITES', favorites);
      }
      return favorites;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return [];
    }
  },

  // Remove a movie from favorites
  removeFavorite: (movieId) => {
    try {
      const favorites = storageService.get('FAVORITES') || [];
      const updatedFavorites = favorites.filter(movie => movie.id !== movieId);
      storageService.set('FAVORITES', updatedFavorites);
      return updatedFavorites;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return [];
    }
  },

  // Check if a movie is in favorites
  isFavorite: (movieId) => {
    try {
      const favorites = storageService.get('FAVORITES') || [];
      return favorites.some(movie => movie.id === movieId);
    } catch (error) {
      console.error('Error checking favorite:', error);
      return false;
    }
  },

  // Save last search query
  saveLastSearch: (query) => {
    return storageService.set('LAST_SEARCH', { query, timestamp: Date.now() });
  },

  // Get last search query
  getLastSearch: () => {
    return storageService.get('LAST_SEARCH');
  },
};