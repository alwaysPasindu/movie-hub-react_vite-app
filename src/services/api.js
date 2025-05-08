import axios from "axios"

const API_KEY = "dd95f0a6768c33fbcdf80034ffaf960a" // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Create axios instance with common config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
})

// Get trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day")
    return response.data
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    throw error
  }
}

// Search movies
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: false,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error searching movies:", error)
    throw error
  }
}

// Get movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "credits,videos",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error fetching movie details:", error)
    throw error
  }
}

// Get movie genres
export const fetchGenres = async () => {
  try {
    const response = await api.get("/genre/movie/list")
    return response.data.genres
  } catch (error) {
    console.error("Error fetching genres:", error)
    throw error
  }
}

// Helper function to get image URL
export const getImageUrl = (path, size = "original") => {
  if (!path) return "https://via.placeholder.com/300x450?text=No+Image"
  return `${IMAGE_BASE_URL}/${size}${path}`
}

// Helper function to get YouTube trailer URL
export const getTrailerUrl = (videos) => {
  if (!videos || !videos.results || videos.results.length === 0) return null

  // Try to find official trailer first
  const officialTrailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube" && video.name.toLowerCase().includes("official"),
  )

  // If no official trailer, get any trailer
  const anyTrailer = videos.results.find((video) => video.type === "Trailer" && video.site === "YouTube")

  // If no trailer, get any video
  const anyVideo = videos.results.find((video) => video.site === "YouTube")

  const video = officialTrailer || anyTrailer || anyVideo

  return video ? `https://www.youtube.com/embed/${video.key}` : null
}
