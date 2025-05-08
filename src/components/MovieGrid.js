import { Grid, Box, Typography, CircularProgress } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "./MovieCard"

const MovieGrid = ({ movies, loading, error, hasMore, loadMore, title }) => {
  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    )
  }

  if (loading && movies.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (movies.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">No movies found</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 2 }}>
      {title && (
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
      )}

      {loadMore ? (
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
            <Typography textAlign="center" sx={{ p: 2 }}>
              You've seen all movies!
            </Typography>
          }
        >
          <Grid container spacing={3}>
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default MovieGrid
