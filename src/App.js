import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { MovieProvider } from "./contexts/MovieContext"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider as CustomThemeProvider } from "./contexts/ThemeContext"
import ThemeContext from "./contexts/ThemeContext" // Import ThemeContext
import PrivateRoute from "./components/PrivateRoute"
import Login from "./pages/Login"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Favorites from "./pages/Favorites"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MovieProvider>
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <Home />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/movie/:id"
                      element={
                        <PrivateRoute>
                          <MovieDetails />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/favorites"
                      element={
                        <PrivateRoute>
                          <Favorites />
                        </PrivateRoute>
                      }
                    />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                  </Routes>
                </Router>
              </MovieProvider>
            </ThemeProvider>
          )}
        </ThemeContext.Consumer>
      </CustomThemeProvider>
    </AuthProvider>
  )
}

export default App
