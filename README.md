# 🎬 Movie Hub (Movie Explorer)

A sleek and responsive React + Vite web application that lets users explore trending movies, search by title, view detailed movie info, filter by genre, and watch trailers — powered by [TMDb API](https://developers.themoviedb.org/3) and YouTube.

---

## 🚀 Features

- 🔐 User Login with username and password (dummy/local implementation).
- 🔍 Movie Search with real-time results using TMDb API.
- 🎞️ Trending movies section from TMDb.
- 🖼️ Grid of movie posters with title, release year, and rating.
- 📄 Detailed view for each movie including overview, genres, cast, and trailer.
- 🌗 Light/Dark Mode toggle.
- 🔄 Infinite scroll or “Load More” option for search results.
- ⭐ Favorite movies list (stored in localStorage).
- 📌 Save last search term (localStorage persistence).
- 🎚️ Filter by genre, release year, and rating.
- 📺 Embedded trailers via YouTube.
- ⚠️ API error handling with user-friendly messages.
- 📱 Fully responsive with mobile-first design using Material UI.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **API**: TMDb API & YouTube embed links
- **State Management**: React Context API
- **Styling**: Material-UI (MUI)
- **Routing**: React Router
- **HTTP Client**: Axios
- **Local Storage**: For search persistence and favorites

---

## 📂 Project Structure

```bash
MOVIE-EXPLORER-REACT-APP/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── LoadingSpinner.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieFilters.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── Navbar.jsx
│   │   └── PrivateRoute.jsx
│   ├── config/
│   │   └── api.config.js
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── MovieContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── FavoritesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MovieDetailPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── vite-env.d.ts
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json

````

---

## 📦 Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/alwaysPasindu/movie-explorer-react-app.git
cd movie-explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Get TMDb API Key

* Sign up at [https://www.themoviedb.org/](https://www.themoviedb.org/)
* Go to account settings → API → Create an API key

Create a `.env` file in the root:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
```

> Optional: You can also add a `.env.local` file for environment-specific config.

### 4. Start Development Server

```bash
npm run dev
```

---

## ✅ Available Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build
```

---

## 📸 Screenshots

> Add relevant screenshots or screen recordings here (Home page, Dark mode, Details page, Trailer player, etc.)

---

## 🌟 Extra Features

* Genre/Year/Rating filters
* YouTube trailers embedded from TMDb
* Optional: Switch between "infinite scroll" and "Load More" UX

---

## 🧠 Author

* 👤 Developed by \Pasindu Dilshan 
* 🔗 Portfolio: https://www.pasindu.tech
* 📧 Email: [always.pasindu@gmail.com](mailto:always.pasindu@gmail.com)

---

## 📄 License

This project is licensed under the MIT License. Feel free to fork and improve it!

---

## 🙏 Acknowledgements

* [TMDb API](https://www.themoviedb.org/)
* [Material UI](https://mui.com/)
* [React Router](https://reactrouter.com/)
* [Vite](https://vitejs.dev/)

