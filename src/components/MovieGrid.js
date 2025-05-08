"use client"

import { useContext } from "react"
import { Box, Typography, CircularProgress, Alert } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "./MovieCard"
import { MovieContext } from "../context/MovieContext"

const MovieGrid = ({ movies, title, infiniteScroll = false }) => {
  const { loading, error, loadMore, hasMore } = useContext(MovieContext)

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6">No movies found</Typography>
      </Box>
    )
  }

  const renderMovies = () => (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )

  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography variant="h4" sx={{ p: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
      )}

      {infiniteScroll ? (
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress />
            </Box>
          }
          endMessage={
            <Box sx={{ textAlign: "center", p: 2 }}>
              <Typography variant="body1">No more movies to load</Typography>
            </Box>
          }
        >
          {renderMovies()}
        </InfiniteScroll>
      ) : (
        renderMovies()
      )}

      {loading && !infiniteScroll && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default MovieGrid
