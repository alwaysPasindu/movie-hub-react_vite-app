import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage';
import FavoritesPage from './pages/FavoritesPage';
import PrivateRoute from './components/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/favorites" 
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;