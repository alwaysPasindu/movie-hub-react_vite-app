import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import MovieDetails from '../components/MovieDetails';
import { fetchMovieDetails } from '../api';

function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadMovie();
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <MovieDetails movie={movie} />
    </Box>
  );
}

export default MovieDetailPage;