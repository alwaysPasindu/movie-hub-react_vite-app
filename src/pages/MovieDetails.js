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
  Paper,
  Divider,
  Card,
  CardMedia,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material"
import { ArrowBack, Favorite, FavoriteBorder, Star, YouTube, CalendarMonth, AccessTime } from "@mui/icons-material"
import Navbar from "../components/Navbar"
import MovieGrid from "../components/MovieGrid"
import { MovieContext } from "../contexts/MovieContext"

const MovieDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getMovieDetails, loading, error, addToFavorites, removeFromFavorites, isInFavorites } =
    useContext(MovieContext)

  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)

  const isFavorite = movie ? isInFavorites(movie.id) : false

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(id)
      if (details) {
        setMovie(details)

        // Find trailer
        const trailerVideo = details.videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        )
        setTrailer(trailerVideo)
      }
    }

    fetchMovieDetails()
  }, [id, getMovieDetails])

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id)
    } else {
      addToFavorites({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      })
    }
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  if (loading || !movie) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <CircularProgress />
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleBackClick} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Container>
      </>
    )
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get top cast members
  const topCast = movie.credits.cast.slice(0, 10)

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Button startIcon={<ArrowBack />} onClick={handleBackClick} variant="outlined" color="inherit" sx={{ mb: 2 }}>
            Back
          </Button>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card elevation={6}>
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.svg?height=750&width=500"
                  }
                  alt={movie.title}
                  sx={{ height: "100%", objectFit: "cover" }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ color: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mr: 2 }}>
                    {movie.title}
                  </Typography>
                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    <IconButton onClick={handleFavoriteClick} color="secondary" sx={{ ml: "auto" }}>
                      {isFavorite ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" />}
                    </IconButton>
                  </Tooltip>
                </Box>

                {movie.tagline && (
                  <Typography variant="h6" sx={{ fontStyle: "italic", mb: 2, color: "grey.400" }}>
                    "{movie.tagline}"
                  </Typography>
                )}

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      variant="outlined"
                      sx={{ color: "white", borderColor: "white" }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Star sx={{ color: "#FFD700", mr: 1 }} />
                    <Typography variant="h6">{movie.vote_average.toFixed(1)}/10</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CalendarMonth sx={{ mr: 1 }} />
                    <Typography variant="body1">{formatDate(movie.release_date)}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTime sx={{ mr: 1 }} />
                    <Typography variant="body1">{formatRuntime(movie.runtime)}</Typography>
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  {movie.overview}
                </Typography>

                {trailer && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<YouTube />}
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 2 }}
                  >
                    Watch Trailer
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* Trailer Section */}
        {trailer && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" gutterBottom>
              Trailer
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Box>
        )}

        {/* Cast Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>
            Top Cast
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {topCast.map((person) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={person.id}>
                <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <Avatar
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                          : "/placeholder.svg?height=200&width=200"
                      }
                      alt={person.name}
                      sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: "bold" }}>
                      {person.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {person.character}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Similar Movies Section */}
        {movie.similar.results.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Similar Movies
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <MovieGrid movies={movie.similar.results.slice(0, 12)} loading={false} error={null} />
          </Box>
        )}
      </Container>
    </>
  )
}

export default MovieDetails
