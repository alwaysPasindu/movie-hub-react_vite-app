import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetailPage from './pages/MovieDetailPage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import { ThemeContext } from './theme';

function App() {
  const { mode } = useContext(ThemeContext);

  return (
    <MovieProvider>
      <Router>
        <Box sx={{ bgcolor: mode === 'dark' ? '#121212' : '#f5f5f5', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </Box>
      </Router>
    </MovieProvider>
  );
}

export default App;