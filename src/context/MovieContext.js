"use client"

import { createContext, useState, useEffect } from "react"
import { fetchTrendingMovies, searchMovies } from "../services/api"

export const MovieContext = createContext()

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("lastSearch") || ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites")
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  // Load trending movies on initial render
  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true)
        const data = await fetchTrendingMovies()
        setTrendingMovies(data.results)
      } catch (err) {
        setError("Failed to load trending movies. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadTrending()
  }, [])

  // Load last search from localStorage
  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch")
    if (lastSearch) {
      setSearchQuery(lastSearch)
      handleSearch(lastSearch, 1)
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Save last search to localStorage
  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem("lastSearch", searchQuery)
    }
  }, [searchQuery])

  const handleSearch = async (query, pageNum = 1) => {
    if (!query) {
      setSearchResults([])
      setPage(1)
      setHasMore(true)
      return
    }

    try {
      setLoading(true)
      setError(null)

      const data = await searchMovies(query, pageNum)

      if (pageNum === 1) {
        setSearchResults(data.results)
      } else {
        setSearchResults((prev) => [...prev, ...data.results])
      }

      setHasMore(data.page < data.total_pages)
      setPage(data.page)
    } catch (err) {
      setError("Failed to search movies. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      handleSearch(searchQuery, page + 1)
    }
  }

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === movie.id)

      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== movie.id)
      } else {
        return [...prevFavorites, movie]
      }
    })
  }

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId)
  }

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        hasMore,
        handleSearch,
        loadMore,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
