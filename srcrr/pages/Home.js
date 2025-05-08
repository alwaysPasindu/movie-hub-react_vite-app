import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { fetchTrendingMovies, searchMovies } from '../api';

function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('trending');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');

  const loadMovies = async () => {
    try {
      let data;
      if (filter === 'trending') {
        data = await fetchTrendingMovies(page);
      } else {
        data = await searchMovies(filter, page);
      }
      setMovies((prev) => [...prev, ...data.results]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (query) => {
    setFilter(query);
    setMovies([]);
    setPage(1);
  };

  useEffect(() => {
    loadMovies();
  }, [page, filter]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Movie Explorer
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Select value={year} onChange={(e) => setYear(e.target.value)} displayEmpty>
          <MenuItem value="">All Years</MenuItem>
          {[...Array(50)].map((_, i) => (
            <MenuItem key={i} value={2025 - i}>
              {2025 - i}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movies
          .filter((movie) => (year ? movie.release_date?.includes(year) : true))
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </Box>
      <Button variant="contained" onClick={() => setPage((prev) => prev + 1)} sx={{ mt: 2 }}>
        Load More
      </Button>
    </Box>
  );
}

export default Home;