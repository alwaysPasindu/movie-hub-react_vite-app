"use client"

import { useContext } from "react"
import { Container, Typography, Box, Button } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import MovieGrid from "../components/MovieGrid"
import { MovieContext } from "../context/MovieContext"

const Favorites = () => {
  const { favorites } = useContext(MovieContext)
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate("/")
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={handleBackClick}>
          Back to Home
        </Button>
      </Box>

      <Typography variant="h4" sx={{ p: 2, fontWeight: "bold" }}>
        My Favorite Movies
      </Typography>

      <MovieGrid movies={favorites} />
    </Container>
  )
}

export default Favorites
