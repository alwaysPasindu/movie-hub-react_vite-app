export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const BACKDROP_SIZE = "w1280";
export const POSTER_SIZE = "w500";

export const ENDPOINTS = {
  TRENDING: `${BASE_URL}/trending/movie/week`,
  SEARCH: `${BASE_URL}/search/movie`,
  MOVIE_DETAILS: `${BASE_URL}/movie`,
  GENRE_LIST: `${BASE_URL}/genre/movie/list`,
};

// Fallback image for missing posters
export const FALLBACK_POSTER = "https://placehold.co/500x750/3B82F6/FFFFFF?text=No+Image";