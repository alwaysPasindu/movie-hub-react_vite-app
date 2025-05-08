"use client"

import { useContext } from "react"
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Paper, Grid } from "@mui/material"
import { MovieContext } from "../contexts/MovieContext"

const FilterPanel = () => {
  const {
    genres,
    selectedGenre,
    setSelectedGenre,
    yearFilter,
    setYearFilter,
    ratingFilter,
    setRatingFilter,
    applyFilters,
    resetFilters,
  } = useContext(MovieContext)

  // Generate years from 1990 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i)

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filter Movies
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              value={selectedGenre}
              label="Genre"
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={yearFilter}
              label="Year"
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <MenuItem value="">All Years</MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="rating-select-label">Min Rating</InputLabel>
            <Select
              labelId="rating-select-label"
              id="rating-select"
              value={ratingFilter}
              label="Min Rating"
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <MenuItem value="">Any Rating</MenuItem>
              <MenuItem value="5">5+</MenuItem>
              <MenuItem value="6">6+</MenuItem>
              <MenuItem value="7">7+</MenuItem>
              <MenuItem value="8">8+</MenuItem>
              <MenuItem value="9">9+</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" onClick={resetFilters}>
          Reset
        </Button>
        <Button variant="contained" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Box>
    </Paper>
  )
}

export default FilterPanel
