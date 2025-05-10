import React, { useEffect, useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/MovieGrid';
import MovieFilters from '../components/MovieFilters';
import { movieService } from '../services/api';

const HomePage = () => {
  const { 
    trending, 
    searchResults, 
    searchQuery, 
    loading, 
    fetchTrending, 
    loadMore, 
    hasMore 
  } = useMovies();
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [filterLoading, setFilterLoading] = useState(false);

  // Fetch trending movies on mount
  useEffect(() => {
    if (trending.length === 0 && !searchQuery) {
      fetchTrending(true);
    }
  }, [fetchTrending, trending.length, searchQuery]);

  // Handle filter application
  const handleApplyFilters = async (filters) => {
    // If no filters are selected, revert to normal trending/search
    if (!filters.genre && !filters.year && !filters.rating) {
      setIsFiltering(false);
      setActiveFilters({});
      return;
    }

    setFilterLoading(true);
    setIsFiltering(true);
    setActiveFilters(filters);

    try {
      const data = await movieService.discoverMovies(filters);
      setFilteredMovies(data.results || []);
    } catch (error) {
      console.error('Error filtering movies:', error);
    } finally {
      setFilterLoading(false);
    }
  };

  // Determine which movies to display
  const displayMovies = isFiltering ? filteredMovies : (searchQuery ? searchResults : trending);
  const isLoading = loading || filterLoading;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        {searchQuery 
          ? `Search Results for "${searchQuery}"`
          : 'Trending Movies'}
      </h1>

      {/* Filters */}
      <MovieFilters onApplyFilters={handleApplyFilters} />

      {/* Movie Grid */}
      <MovieGrid 
        movies={displayMovies} 
        loading={isLoading} 
        loadMore={loadMore} 
        hasMore={!isFiltering && hasMore}
        useInfiniteScroll={!isFiltering}
        emptyMessage={
          searchQuery 
            ? `No results found for "${searchQuery}"`
            : isFiltering
              ? "No movies match your filters"
              : "No trending movies available"
        }
      />
    </div>
  );
};

export default HomePage;