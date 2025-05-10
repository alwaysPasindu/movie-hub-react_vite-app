import React, { useState, useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import { Filter, X, ChevronDown } from 'lucide-react';

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);
const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const MovieFilters = ({ onApplyFilters }) => {
  const { genres } = useMovies();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Check if any filters are active
  useEffect(() => {
    setHasActiveFilters(!!selectedGenre || !!selectedYear || !!selectedRating);
  }, [selectedGenre, selectedYear, selectedRating]);

  // Toggle filters panel
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  // Apply filters
  const applyFilters = () => {
    onApplyFilters({
      genre: selectedGenre || undefined,
      year: selectedYear || undefined,
      rating: selectedRating || undefined
    });
    setIsOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    onApplyFilters({});
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={toggleFilters}
          className={`btn ${
            hasActiveFilters ? 'btn-primary' : 'btn-secondary'
          } flex items-center`}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {hasActiveFilters && (
          <button 
            onClick={resetFilters}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </button>
        )}
      </div>
      
      {isOpen && (
        <div className="mt-4 p-4 bg-white dark:bg-dark-100 rounded-lg shadow-md animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genre filter */}
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Genre
              </label>
              <select
                id="genre"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="input w-full"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Year filter */}
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Release Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input w-full"
              >
                <option value="">All Years</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Rating filter */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Minimum Rating
              </label>
              <select
                id="rating"
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="input w-full"
              >
                <option value="">Any Rating</option>
                {RATINGS.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}+ Stars
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={applyFilters}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieFilters;