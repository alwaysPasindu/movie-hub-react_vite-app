"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Typography, TextField, Button, Alert, Paper } from "@mui/material"
import { AuthContext } from "../context/AuthContext"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!username.trim()) {
      setError("Username is required")
      return
    }

    if (!password.trim()) {
      setError("Password is required")
      return
    }

    const success = login(username, password)

    if (success) {
      navigate("/")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="login-container">
      <Paper className="login-form">
        <div className="login-logo">
          <Typography variant="h4" color="primary" fontWeight="bold">
            MOVIE EXPLORER
          </Typography>
        </div>

        <Typography variant="h5" className="login-title">
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmitt={handleSubmit}>
          <TextField
            className="login-input"
            label="Username"
            variant="filled"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ style: { backgroundColor: "#333", color: "white" } }}
            InputLabelProps={{ style: { color: "#8c8c8c" } }}
          />

          <TextField
            className="login-input"
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ style: { backgroundColor: "#333", color: "white" } }}
            InputLabelProps={{ style: { color: "#8c8c8c" } }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">
            Sign In
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default Login
