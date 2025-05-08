"use client"

import { useContext } from "react"
import { Container, Box, Typography, Divider } from "@mui/material"
import SearchBar from "../components/SearchBar"
import MovieGrid from "../components/MovieGrid"
import { MovieContext } from "../context/MovieContext"

const Home = () => {
  const { trendingMovies, searchResults, searchQuery } = useContext(MovieContext)

  return (
    <Container maxWidth="xl">
      <SearchBar />

      {searchQuery ? (
        <MovieGrid movies={searchResults} title={`Search Results for "${searchQuery}"`} infiniteScroll={true} />
      ) : (
        <>
          <Box sx={{ my: 2 }}>
            <Typography variant="h4" sx={{ p: 2, fontWeight: "bold" }}>
              Trending Movies
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <MovieGrid movies={trendingMovies} />
          </Box>
        </>
      )}
    </Container>
  )
}

export default Home
