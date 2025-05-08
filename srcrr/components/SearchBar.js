import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { MovieContext } from '../contexts/MovieContext';

function SearchBar({ onSearch }) {
  const { setLastSearch } = useContext(MovieContext);
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setLastSearch(query);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;