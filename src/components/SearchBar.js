"use client"

import { useContext, useState, useEffect } from "react"
import { TextField, InputAdornment, IconButton, Paper } from "@mui/material"
import { Search, Clear } from "@mui/icons-material"
import { MovieContext } from "../context/MovieContext"

const SearchBar = () => {
  const { searchQuery, setSearchQuery, handleSearch } = useContext(MovieContext)
  const [inputValue, setInputValue] = useState(searchQuery)

  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(inputValue)
    handleSearch(inputValue, 1)
  }

  const handleClear = () => {
    setInputValue("")
    setSearchQuery("")
    handleSearch("", 1)
  }

  return (
    <div className="search-container">
      <Paper component="form" onSubmit={handleSubmit} className="search-bar" elevation={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for movies..."
          value={inputValue}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton aria-label="clear search" onClick={handleClear} edge="end">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </div>
  )
}

export default SearchBar
