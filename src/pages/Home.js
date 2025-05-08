"use client"

import { useContext, useEffect } from "react"
import { Container, Typography, Box, Divider } from "@mui/material"
import Navbar from "../components/Navbar"
import MovieGrid from "../components/MovieGrid"
import FilterPanel from "../components/FilterPanel"
import { MovieContext } from "../contexts/MovieContext"

const Home = () => {
  const {
    trendingMovies,
    searchResults,
    searchQuery,
    lastSearchQuery,
    loading,
    error,
    hasMore,
    loadMoreResults,
    searchMovies,
  } = useContext(MovieContext)

  // If there's a last search query in localStorage, search for it on initial load
  useEffect(() => {
    if (lastSearchQuery && !searchQuery) {
      searchMovies(lastSearchQuery)
    }
  }, [lastSearchQuery, searchQuery, searchMovies])

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {searchQuery && (
          <>
            <FilterPanel />
            <Typography variant="h4" component="h1" gutterBottom>
              Search Results for "{searchQuery}"
            </Typography>
            <MovieGrid
              movies={searchResults}
              loading={loading}
              error={error}
              hasMore={hasMore}
              loadMore={loadMoreResults}
            />
          </>
        )}

        {!searchQuery && (
          <>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Trending Movies This Week
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <MovieGrid movies={trendingMovies} loading={loading} error={error} title="" />
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

export default Home
