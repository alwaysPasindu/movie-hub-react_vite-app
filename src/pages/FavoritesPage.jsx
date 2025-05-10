import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import { Heart, Film, ArrowLeft } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useMovies();

  // Handle removing a movie from favorites
  const handleRemoveFavorite = (movieId) => {
    const movie = favorites.find(movie => movie.id === movieId);
    if (movie) {
      toggleFavorite(movie);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Link to="/" className="btn btn-secondary mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold">Your Favorite Movies</h1>
      </div>

      {/* Favorites count */}
      <div className="flex items-center text-gray-700 dark:text-gray-300 mb-6">
        <Heart className="h-5 w-5 text-error-500 mr-2 fill-error-500" />
        <span>
          {favorites.length === 0
            ? 'You have no favorite movies yet'
            : `You have ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}`}
        </span>
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-dark-100 rounded-lg shadow-card p-8 text-center">
          <Film className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start exploring and add movies to your favorites list!
          </p>
          <Link to="/" className="btn btn-primary">
            Browse Movies
          </Link>
        </div>
      ) : (
        // MovieGrid with favorites
        <MovieGrid 
          movies={favorites} 
          loading={false} 
          hasMore={false}
          useInfiniteScroll={false}
        />
      )}
    </div>
  );
};

export default FavoritesPage;