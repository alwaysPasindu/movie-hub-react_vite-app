import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import { IMAGE_BASE_URL, POSTER_SIZE, FALLBACK_POSTER } from '../config/api.config';

const MovieCard = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useMovies();
  const isMovieFavorite = isFavorite(movie.id);

  // Format release date to year only
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  
  // Get poster path or fallback
  const posterPath = movie.poster_path 
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}` 
    : FALLBACK_POSTER;

  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="movie-card group relative h-full flex flex-col">
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={posterPath} 
            alt={movie.title} 
            className="movie-card-image"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-4 text-white">
              <div className="font-medium">{movie.title}</div>
              {movie.vote_average > 0 && (
                <div className="flex items-center mt-1">
                  <Star className="h-3.5 w-3.5 text-accent-500 mr-1 fill-accent-500" />
                  <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{movie.title}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">{releaseYear}</span>
            {movie.vote_average > 0 && (
              <div className="flex items-center text-sm">
                <Star className="h-3.5 w-3.5 text-accent-500 mr-1 fill-accent-500" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          isMovieFavorite 
            ? 'bg-white text-error-500' 
            : 'bg-black/50 text-white hover:bg-white hover:text-error-500'
        } transition-colors duration-200`}
        aria-label={isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={`h-4 w-4 ${isMovieFavorite ? 'fill-error-500' : ''}`} />
      </button>
    </div>
  );
};

export default MovieCard;