"use client"

import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Brightness4, Brightness7, AccountCircle, Favorite, Home } from "@mui/icons-material"
import { ThemeContext } from "../context/ThemeContext"
import { AuthContext } from "../context/AuthContext"

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    logout()
    navigate("/login")
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          Movie Explorer
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" component={Link} to="/" startIcon={<Home />}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/favorites" startIcon={<Favorite />}>
              Favorites
            </Button>
          </Box>
        )}

        <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isMobile && (
              <>
                <MenuItem component={Link} to="/" onClick={handleClose}>
                  Home
                </MenuItem>
                <MenuItem component={Link} to="/favorites" onClick={handleClose}>
                  Favorites
                </MenuItem>
                <MenuItem onClick={toggleTheme}>{darkMode ? "Light Mode" : "Dark Mode"}</MenuItem>
              </>
            )}
            <MenuItem disabled>{user ? `Hi, ${user.username}` : "Guest"}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
