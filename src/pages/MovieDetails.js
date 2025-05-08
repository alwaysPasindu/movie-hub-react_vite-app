"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  Divider,
} from "@mui/material"
import { ArrowBack, Favorite, FavoriteBorder, Star, AccessTime, CalendarToday } from "@mui/icons-material"
import { fetchMovieDetails, getImageUrl, getTrailerUrl } from "../services/api"
import { MovieContext } from "../context/MovieContext"

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useContext(MovieContext)
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const favorite = movie ? isFavorite(movie.id) : false

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchMovieDetails(id)
        setMovie(data)
      } catch (err) {
        setError("Failed to load movie details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getMovieDetails()
  }, [id])

  const handleFavoriteClick = () => {
    toggleFavorite(movie)
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button startIcon={<ArrowBack />} onClick={handleBackClick} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    )
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="info">Movie not found</Alert>
        <Button startIcon={<ArrowBack />} onClick={handleBackClick} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Container>
    )
  }

  const trailerUrl = getTrailerUrl(movie.videos)

  return (
    <Container maxWidth="lg" className="movie-details-container">
      <Button startIcon={<ArrowBack />} onClick={handleBackClick} sx={{ mb: 2 }}>
        Go Back
      </Button>

      {/* Backdrop Image */}
      <Box sx={{ position: "relative", mb: 4 }}>
        <img
          src={getImageUrl(movie.backdrop_path, "original") || "/placeholder.svg"}
          alt={movie.title}
          className="movie-backdrop"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {movie.title}
          </Typography>
          <Typography variant="subtitle1">{movie.tagline}</Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Poster and Info */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: "relative" }}>
            <img
              src={getImageUrl(movie.poster_path, "w500") || "/placeholder.svg"}
              alt={movie.title}
              className="movie-poster"
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                },
              }}
              onClick={handleFavoriteClick}
            >
              {favorite ? <Favorite sx={{ color: "#e50914" }} /> : <FavoriteBorder sx={{ color: "white" }} />}
            </IconButton>
          </Box>

          <Paper sx={{ mt: 2, p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Star sx={{ color: "#FFD700", mr: 1 }} />
              <Typography variant="h6">{movie.vote_average.toFixed(1)}/10</Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({movie.vote_count} votes)
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <CalendarToday sx={{ mr: 1 }} />
              <Typography>
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AccessTime sx={{ mr: 1 }} />
              <Typography>{movie.runtime} minutes</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Genres
            </Typography>
            <Box className="movie-genres">
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} size="small" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Details */}
        <Grid item xs={12} md={8}>
          <Box className="movie-info">
            <Typography variant="h5" fontWeight="bold">
              Overview
            </Typography>
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Trailer */}
            {trailerUrl && (
              <Box className="trailer-container">
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Trailer
                </Typography>
                <Box sx={{ position: "relative", paddingTop: "56.25%", overflow: "hidden", borderRadius: 2 }}>
                  <iframe
                    src={trailerUrl}
                    title={`${movie.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>
              </Box>
            )}

            {/* Cast */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Cast
              </Typography>
              <div className="cast-list">
                {movie.credits.cast.slice(0, 10).map((person) => (
                  <div key={person.id} className="cast-item">
                    <img
                      src={getImageUrl(person.profile_path, "w185") || "/placeholder.svg"}
                      alt={person.name}
                      className="cast-image"
                    />
                    <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                      {person.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {person.character}
                    </Typography>
                  </div>
                ))}
              </div>
            </Box>

            {/* Production Companies */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Production
              </Typography>
              <Grid container spacing={2}>
                {movie.production_companies.map((company) => (
                  <Grid item key={company.id} xs={6} sm={4} md={3}>
                    <Paper sx={{ p: 2, textAlign: "center", height: "100%" }}>
                      {company.logo_path ? (
                        <img
                          src={getImageUrl(company.logo_path, "w200") || "/placeholder.svg"}
                          alt={company.name}
                          style={{ maxHeight: 60, maxWidth: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No Logo
                        </Typography>
                      )}
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {company.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MovieDetails
