"use client"

import { useContext } from "react"
import { Container, Typography, Box, Button, Divider } from "@mui/material"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import MovieGrid from "../components/MovieGrid"
import { MovieContext } from "../contexts/MovieContext"

const Favorites = () => {
  const { favorites } = useContext(MovieContext)

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" component="h1">
            My Favorite Movies
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary" sx={{ ml: "auto" }}>
            Discover More Movies
          </Button>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <MovieGrid movies={favorites} loading={false} error={null} title="" />
      </Container>
    </>
  )
}

export default Favorites
