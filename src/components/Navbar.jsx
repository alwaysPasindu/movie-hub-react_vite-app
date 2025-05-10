import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Film, Search, Sun, Moon, Heart, LogIn, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const { searchMovies, searchQuery, clearSearch } = useMovies();
  const [query, setQuery] = useState(searchQuery || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  // Update search input when searchQuery changes
  useEffect(() => {
    setQuery(searchQuery || '');
  }, [searchQuery]);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchMovies(query.trim(), true);
      navigate('/');
      searchRef.current?.blur();
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      clearSearch();
    }
  };

  // Toggle menu for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-100 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <Film className="h-6 w-6" />
            <span className="hidden sm:inline">MovieHub</span>
          </Link>

          {/* Search Form - Desktop */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex relative flex-1 max-w-md mx-4"
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={handleInputChange}
              className="input w-full pr-10"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-500"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="btn-secondary rounded-full p-2"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {currentUser ? (
              <>
                <Link 
                  to="/favorites" 
                  className="btn-secondary rounded-full p-2"
                  aria-label="Favorites"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <button 
                  onClick={logout} 
                  className="btn btn-primary"
                >
                  <LogOut className="h-4 w-4 mr-2 inline" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary">
                <LogIn className="h-4 w-4 mr-2 inline" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden btn-secondary rounded-full p-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <form 
              onSubmit={handleSearch} 
              className="relative mb-4"
            >
              <input
                type="text"
                placeholder="Search for movies..."
                value={query}
                onChange={handleInputChange}
                className="input w-full pr-10"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <div className="flex flex-col gap-2">
              <button 
                onClick={toggleTheme} 
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-200"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {currentUser ? (
                <>
                  <Link 
                    to="/favorites" 
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-200"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    <span>Favorites</span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-200 text-error-500"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-dark-200"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;