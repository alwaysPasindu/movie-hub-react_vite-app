"use client"

import { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { ThemeContext } from "./context/ThemeContext"
import { AuthContext } from "./context/AuthContext"

// Pages
import Login from "./pages/Login"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Favorites from "./pages/Favorites"
import NotFound from "./pages/NotFound"

// Components
import Header from "./components/Header"

function App() {
  const { darkMode } = useContext(ThemeContext)
  const { isAuthenticated } = useContext(AuthContext)

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#e50914",
      },
      secondary: {
        main: "#0071eb",
      },
      background: {
        default: darkMode ? "#141414" : "#f5f5f5",
        paper: darkMode ? "#1f1f1f" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.03)",
            },
          },
        },
      },
    },
  })

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    return children
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
