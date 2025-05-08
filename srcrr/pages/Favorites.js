import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { MovieContext } from '../contexts/MovieContext';

function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No favorites yet.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Favorites;