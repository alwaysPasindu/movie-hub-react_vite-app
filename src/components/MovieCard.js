"use client"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material"
import { Favorite, FavoriteBorder, Star } from "@mui/icons-material"
import { MovieContext } from "../context/MovieContext"
import { getImageUrl } from "../services/api"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useContext(MovieContext)
  const favorite = isFavorite(movie.id)

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <Card className="movie-card">
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          className="movie-card-media"
          image={getImageUrl(movie.poster_path, "w500")}
          alt={movie.title}
        />
        <CardContent className="movie-card-content">
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {movie.title}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            </Typography>
            <Box display="flex" alignItems="center">
              <Star sx={{ color: "#FFD700", mr: 0.5 }} fontSize="small" />
              <Typography variant="body2">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
        onClick={handleFavoriteClick}
      >
        {favorite ? <Favorite sx={{ color: "#e50914" }} /> : <FavoriteBorder sx={{ color: "white" }} />}
      </IconButton>
    </Card>
  )
}

export default MovieCard
