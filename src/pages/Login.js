"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  CssBaseline,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material"
import { LockOutlined, Visibility, VisibilityOff, Movie as MovieIcon } from "@mui/icons-material"
import { AuthContext } from "../contexts/AuthContext"
import { ThemeContext } from "../contexts/ThemeContext"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useContext(AuthContext)
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required")
      return
    }

    const success = login(username, password)

    if (!success) {
      setError("Invalid username or password")
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <MovieIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
              Movie Explorer
            </Typography>
          </Box>
          <Typography component="h2" variant="h6">
            Sign In
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button variant="text" onClick={toggleDarkMode} startIcon={darkMode ? <Visibility /> : <VisibilityOff />}>
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              For demo purposes, enter any username and password
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default Login
