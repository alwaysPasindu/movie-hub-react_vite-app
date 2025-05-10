import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Calendar, 
  Clock, 
  Layers, 
  Heart, 
  PlayCircle,
  ArrowLeft 
} from 'lucide-react';
import { movieService } from '../services/api';
import { useMovies } from '../contexts/MovieContext';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieGrid from '../components/MovieGrid';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, FALLBACK_POSTER } from '../config/api.config';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const { toggleFavorite, isFavorite } = useMovies();
  
  // Check if movie is in favorites
  const isMovieFavorite = movie ? isFavorite(movie.id) : false;

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [id]);

  // Handle favorite toggle
  const handleFavoriteClick = () => {
    toggleFavorite(movie);
  };

  // Show trailer modal
  const openTrailer = () => {
    setShowTrailer(true);
  };

  // Close trailer modal
  const closeTrailer = () => {
    setShowTrailer(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-error-500 mb-4">Error</h1>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
        <Link to="/" className="btn btn-primary mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">We couldn't find the movie you're looking for.</p>
        <Link to="/" className="btn btn-primary mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  // Format data
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
  
  // Get backdrop and poster URLs
  const backdropUrl = movie.backdrop_path 
    ? `${IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}` 
    : null;
  const posterUrl = movie.poster_path 
    ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}` 
    : FALLBACK_POSTER;
  
  // Get trailer (if available)
  const trailer = movie.videos?.results?.find(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Get cast (first 10)
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  
  // Get recommendations
  const recommendations = movie.recommendations?.results || [];

  return (
    <div>
      {/* Hero Section with Backdrop */}
      <div 
        className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-gray-900 bg-cover bg-center"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        
        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link to="/" className="btn btn-secondary flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 h-full">
          {/* Poster */}
          <div className="w-48 md:w-64 flex-shrink-0">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          {/* Movie Details */}
          <div className="flex-1 text-white text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie.title} <span className="text-gray-400">({releaseYear})</span>
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              {movie.vote_average > 0 && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-accent-500 mr-1 fill-accent-500" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                <span>{releaseDate}</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-1" />
                <span>{runtime}</span>
              </div>
              
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex items-center">
                  <Layers className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{movie.genres.map(g => g.name).join(', ')}</span>
                </div>
              )}
            </div>
            
            {/* Tag line */}
            {movie.tagline && (
              <div className="mt-4 text-gray-400 italic">"{movie.tagline}"</div>
            )}
            
            {/* Overview */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
              {trailer && (
                <button 
                  onClick={openTrailer} 
                  className="btn btn-accent"
                >
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Trailer
                </button>
              )}
              
              <button 
                onClick={handleFavoriteClick} 
                className={`btn ${isMovieFavorite ? 'bg-error-500 hover:bg-error-600 text-white' : 'btn-secondary'}`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isMovieFavorite ? 'fill-white' : ''}`} />
                {isMovieFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Cast Section */}
        {cast.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cast.map(person => (
                <div key={person.id} className="bg-white dark:bg-dark-100 rounded-lg overflow-hidden shadow-card">
                  <img 
                    src={person.profile_path 
                      ? `${IMAGE_BASE_URL}/w185${person.profile_path}` 
                      : 'https://placehold.co/185x278/3B82F6/FFFFFF?text=No+Image'
                    } 
                    alt={person.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
            <MovieGrid 
              movies={recommendations} 
              loading={false} 
              hasMore={false}
              useInfiniteScroll={false}
            />
          </section>
        )}
      </div>
      
      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl max-h-[80vh]">
            <button 
              onClick={closeTrailer}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
              aria-label="Close trailer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;