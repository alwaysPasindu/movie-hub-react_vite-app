import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MovieContext } from '../contexts/MovieContext';

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const isFavorite = favorites.some((fav) => fav.id === movie.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Card sx={{ maxWidth: 200, m: 1 }}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">{movie.release_date?.split('-')[0]}</Typography>
        <Typography variant="body2">Rating: {movie.vote_average}</Typography>
        <IconButton onClick={handleFavorite}>
          <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
        </IconButton>
        <Button component={Link} to={`/movie/${movie.id}`}>
          Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default MovieCard;