import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import { Film } from 'lucide-react';

const MovieGrid = ({ 
  movies, 
  loading, 
  hasMore, 
  loadMore,
  useInfiniteScroll = true, 
  emptyMessage = 'No movies found'
}) => {
  if (loading && movies.length === 0) {
    return <LoadingSpinner />;
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Film className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">{emptyMessage}</h3>
      </div>
    );
  }

  const renderMovieGrid = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map(movie => (
        <div key={movie.id} className="h-full">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );

  if (useInfiniteScroll) {
    return (
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <div className="py-4 text-center">
            <LoadingSpinner small />
          </div>
        }
        endMessage={
          movies.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              You've seen it all!
            </p>
          )
        }
      >
        {renderMovieGrid()}
      </InfiniteScroll>
    );
  }

  return (
    <>
      {renderMovieGrid()}
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={loadMore} 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
};

export default MovieGrid;