Movie Explorer
A React-based web application that allows users to search for movies, view details, and discover trending films using the TMDb API.
Features

User login interface (mock authentication)
Search movies by name
Display trending movies
View detailed movie information (overview, genres, trailer)
Save favorite movies to local storage
Filter movies by year
Light/dark mode toggle
Responsive design with Material-UI
"Load More" button for pagination

Setup Instructions

Clone the repository:git clone https://github.com/your-username/movie-explorer.git


Navigate to the project folder:cd movie-explorer


Install dependencies:npm install


Create a .env file in the root directory and add your TMDb API key:REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here


Start the development server:npm start


Open http://localhost:3000 in your browser.

API Usage

TMDb API: Used to fetch trending movies, search results, and movie details.
Register at TMDb to get an API key.

Deployment

Deployed on Vercel: Live Demo
To deploy:
Push code to a GitHub repository.
Import the repository in Vercel.
Add the REACT_APP_TMDB_API_KEY environment variable in Vercel.
Deploy the app.



Technologies Used

React
Material-UI
Axios
React Router
TMDb API
Local Storage

Project Structure
movie-explorer/
├── public/
├── src/
│   ├── components/
│   │   ├── MovieCard.js
│   │   ├── SearchBar.js
│   │   ├── MovieDetails.js
│   │   ├── Login.js
│   │   ├── Navbar.js
│   ├── contexts/
│   │   ├── MovieContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Favorites.js
│   │   ├── MovieDetailPage.js
│   ├── App.js
│   ├── index.js
│   ├── api.js
│   ├── theme.js
├── .env
├── README.md
└── package.json

