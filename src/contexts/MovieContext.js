"use client"

import { createContext, useState, useEffect, useCallback } from "react"
import axios from "axios"

export const MovieContext = createContext()

const API_KEY = "dd95f0a6768c33fbcdf80034ffaf960a"
const BASE_URL = "https://api.themoviedb.org/3"

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [lastSearchQuery, setLastSearchQuery] = useState(() => {
    return localStorage.getItem("lastSearchQuery") || ""
  })
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites")
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState("")
  const [yearFilter, setYearFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Save last search query to localStorage
  useEffect(() => {
    if (lastSearchQuery) {
      localStorage.setItem("lastSearchQuery", lastSearchQuery)
    }
  }, [lastSearchQuery])

  // Fetch trending movies on initial load
  useEffect(() => {
    fetchTrendingMovies()
    fetchGenres()
  }, [])

  // Fetch genres list
  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
        },
      })
      setGenres(response.data.genres)
    } catch (error) {
      console.error("Error fetching genres:", error)
      setError("Failed to fetch genres. Please try again later.")
    }
  }

  // Fetch trending movies
  const fetchTrendingMovies = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
        params: {
          api_key: API_KEY,
        },
      })
      setTrendingMovies(response.data.results)
    } catch (error) {
      console.error("Error fetching trending movies:", error)
      setError("Failed to fetch trending movies. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Search movies
  const searchMovies = useCallback(
    async (query, pageNum = 1, resetResults = true) => {
      if (!query) return

      setLoading(true)
      setError(null)

      try {
        const params = {
          api_key: API_KEY,
          query,
          page: pageNum,
        }

        // Add filters if they exist
        if (selectedGenre) params.with_genres = selectedGenre
        if (yearFilter) params.primary_release_year = yearFilter
        if (ratingFilter) params.vote_average_gte = ratingFilter

        const response = await axios.get(`${BASE_URL}/search/movie`, { params })

        if (resetResults) {
          setSearchResults(response.data.results)
        } else {
          setSearchResults((prev) => [...prev, ...response.data.results])
        }

        setHasMore(response.data.page < response.data.total_pages)
        setLastSearchQuery(query)
      } catch (error) {
        console.error("Error searching movies:", error)
        setError("Failed to search movies. Please try again later.")
      } finally {
        setLoading(false)
      }
    },
    [selectedGenre, yearFilter, ratingFilter],
  )

  // Load more search results (for infinite scroll)
  const loadMoreResults = useCallback(() => {
    if (!loading && hasMore && searchQuery) {
      const nextPage = page + 1
      setPage(nextPage)
      searchMovies(searchQuery, nextPage, false)
    }
  }, [loading, hasMore, searchQuery, page, searchMovies])

  // Get movie details
  const getMovieDetails = async (movieId) => {
    setLoading(true)
    setError(null)
    try {
      const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "similar",
          },
        }),
        axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
          params: {
            api_key: API_KEY,
          },
        }),
      ])

      const movieDetails = {
        ...detailsResponse.data,
        credits: creditsResponse.data,
        videos: videosResponse.data,
      }

      return movieDetails
    } catch (error) {
      console.error("Error fetching movie details:", error)
      setError("Failed to fetch movie details. Please try again later.")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Add movie to favorites
  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      // Check if movie is already in favorites
      if (prev.some((m) => m.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  // Remove movie from favorites
  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId))
  }

  // Check if a movie is in favorites
  const isInFavorites = (movieId) => {
    return favorites.some((movie) => movie.id === movieId)
  }

  // Apply filters and search again
  const applyFilters = () => {
    setPage(1)
    if (searchQuery) {
      searchMovies(searchQuery, 1, true)
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSelectedGenre("")
    setYearFilter("")
    setRatingFilter("")
    setPage(1)
    if (searchQuery) {
      searchMovies(searchQuery, 1, true)
    }
  }

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        searchQuery,
        setSearchQuery,
        lastSearchQuery,
        favorites,
        loading,
        error,
        page,
        hasMore,
        genres,
        selectedGenre,
        setSelectedGenre,
        yearFilter,
        setYearFilter,
        ratingFilter,
        setRatingFilter,
        searchMovies,
        loadMoreResults,
        getMovieDetails,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        applyFilters,
        resetFilters,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
