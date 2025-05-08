import React from 'react';
import { Box, Typography, Chip, Button } from '@mui/material';

function MovieDetails({ movie }) {
  const trailer = movie.videos?.results.find((vid) => vid.type === 'Trailer');

  return (
    <Box sx={{ p: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: '300px' }}
      />
      <Box>
        <Typography variant="h4">{movie.title}</Typography>
        <Typography variant="body1">{movie.overview}</Typography>
        <Typography variant="body2">Release: {movie.release_date}</Typography>
        <Typography variant="body2">Rating: {movie.vote_average}</Typography>
        <Box sx={{ my: 2 }}>
          {movie.genres?.map((genre) => (
            <Chip key={genre.id} label={genre.name} sx={{ m: 0.5 }} />
          ))}
        </Box>
        {trailer && (
          <Button
            variant="contained"
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
          >
            Watch Trailer
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default MovieDetails;