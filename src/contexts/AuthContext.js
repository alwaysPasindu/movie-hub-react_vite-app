"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true"
  })

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated)
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  }, [isAuthenticated, user])

  const login = (username, password) => {
    // In a real app, you would validate credentials against a backend
    // For this demo, we'll accept any non-empty username/password
    if (username && password) {
      setUser({ username })
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
    localStorage.setItem("isAuthenticated", "false")
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}
