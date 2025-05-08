"use client"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Box,
  Tooltip,
} from "@mui/material"
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material"
import { MovieContext } from "../contexts/MovieContext"

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useContext(MovieContext)
  const navigate = useNavigate()

  const isFavorite = isInFavorites(movie.id)

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (isFavorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites(movie)
    }
  }

  return (
    <Card className="movie-card" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="300"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.svg?height=300&width=200"
          }
          alt={movie.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Chip
              label={movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
              size="small"
              variant="outlined"
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Star sx={{ color: "#FFD700", mr: 0.5 }} fontSize="small" />
              <Typography variant="body2">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
          <IconButton
            aria-label={isFavorite ? "remove from favorites" : "add to favorites"}
            onClick={handleFavoriteClick}
            color="secondary"
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  )
}

export default MovieCard
