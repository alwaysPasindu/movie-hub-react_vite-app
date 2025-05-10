import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../config/api.config';

// Create an axios instance with default configurations
const api = axios.create({
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Handle API response
const handleResponse = (response) => {
  return response.data;
};

// Handle API errors
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.status_message || "An error occurred");
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Network Error:", error.request);
    throw new Error("Network error, please check your connection");
  } else {
    // Something happened in setting up the request
    console.error("Request Error:", error.message);
    throw error;
  }
};

// API services
export const movieService = {
  // Get trending movies
  getTrending: async (page = 1) => {
    try {
      const response = await api.get(`${ENDPOINTS.TRENDING}`, {
        params: { page }
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Search for movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get(`${ENDPOINTS.SEARCH}`, {
        params: { query, page }
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await api.get(`${ENDPOINTS.MOVIE_DETAILS}/${movieId}`, {
        params: { append_to_response: 'videos,credits,recommendations' }
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Get movie genres
  getGenres: async () => {
    try {
      const response = await api.get(`${ENDPOINTS.GENRE_LIST}`);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  // Filter movies by genre, year, or rating
  discoverMovies: async (options = {}) => {
    try {
      const { year, genre, rating, sortBy = 'popularity.desc', page = 1 } = options;
      const params = { page, sort_by: sortBy };
      
      if (year) params.primary_release_year = year;
      if (genre) params.with_genres = genre;
      if (rating) params.vote_average_gte = rating;

      const response = await api.get(`${ENDPOINTS.MOVIE_DETAILS}/discover/movie`, { params });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  }
};