"use client"

import { createContext, useState, useEffect, useMemo } from "react"
import { createTheme } from "@mui/material/styles"

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode")
    return savedMode ? JSON.parse(savedMode) : false
  })

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#f50057",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "12px",
                boxShadow: darkMode ? "0 8px 16px rgba(0, 0, 0, 0.4)" : "0 8px 16px rgba(0, 0, 0, 0.1)",
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: darkMode ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
              },
            },
          },
        },
      }),
    [darkMode],
  )

  return <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>{children}</ThemeContext.Provider>
}

export default ThemeContext
