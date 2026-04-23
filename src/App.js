import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import Loader from "./Loader";
import Toast from "./Toast";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("movieFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeTab, setActiveTab] = useState("search");
  const [typeFilter, setTypeFilter] = useState("all");
  const [toast, setToast] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    searchMovies("Batman");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("movieFavorites", JSON.stringify(favorites));
    } catch {
      // storage unavailable
    }
  }, [favorites]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchMovies = async (title) => {
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    try {
      const typeParam = typeFilter !== "all" ? `&type=${typeFilter}` : "";
      const response = await fetch(`${API_URL}&s=${encodeURIComponent(title)}${typeParam}`);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError("Failed to fetch movies. Please try again.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchMovies(searchTerm);
  };

  const showToastMessage = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorite = (movie) => {
    const imdbID = movie.imdbID;
    const isFav = favorites.some((f) => f.imdbID === imdbID);
    if (isFav) {
      setFavorites((prev) => prev.filter((f) => f.imdbID !== imdbID));
      showToastMessage("Removed from favorites", "remove");
    } else {
      setFavorites((prev) => [...prev, movie]);
      showToastMessage("Added to favorites!", "add");
    }
  };

  const isFavorite = (imdbID) => favorites.some((f) => f.imdbID === imdbID);

  const displayMovies = activeTab === "favorites" ? favorites : movies;
  const filteredMovies =
    typeFilter === "all"
      ? displayMovies
      : displayMovies.filter((m) => m.Type === typeFilter);

  return (
    <div className="app">
      <div className="stars" aria-hidden="true"></div>
      <div className="stars2" aria-hidden="true"></div>
      <div className="stars3" aria-hidden="true"></div>

      <header className="app-header">
        <div className="logo-container">
          <span className="logo-icon" aria-hidden="true">🎬</span>
          <h1 className="logo-text">
            <span className="logo-movie">Movie</span>
            <span className="logo-land">Land</span>
          </h1>
        </div>
        <p className="tagline">Discover your next favorite film</p>
      </header>

      <nav className="tabs" aria-label="Navigation">
        <button
          className={`tab-btn ${activeTab === "search" ? "active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          🔍 Search
        </button>
        <button
          className={`tab-btn ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          ❤️ Favorites{" "}
          {favorites.length > 0 && (
            <span className="tab-badge">{favorites.length}</span>
          )}
        </button>
      </nav>

      {activeTab === "search" && (
        <div className="search-container">
          <div className="search">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for movies, series..."
              aria-label="Search movies"
            />
            <button
              className="search-btn"
              onClick={() => searchMovies(searchTerm)}
              aria-label="Search"
            >
              <img src={SearchIcon} alt="" aria-hidden="true" />
            </button>
          </div>
          <div className="type-filters" role="group" aria-label="Filter by type">
            {["all", "movie", "series", "episode"].map((type) => (
              <button
                key={type}
                className={`filter-btn ${typeFilter === type ? "active" : ""}`}
                onClick={() => setTypeFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : error && activeTab === "search" ? (
        <div className="empty">
          <div className="empty-icon">🎭</div>
          <h2>{error}</h2>
          <p>Try searching for something else</p>
        </div>
      ) : filteredMovies?.length > 0 ? (
        <div className="container">
          {filteredMovies.map((movie, index) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              index={index}
              isFavorite={isFavorite(movie.imdbID)}
              onFavorite={toggleFavorite}
              onSelect={setSelectedMovie}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="empty-icon">{activeTab === "favorites" ? "💔" : "🎭"}</div>
          <h2>
            {activeTab === "favorites" ? "No favorites yet" : "No movies found"}
          </h2>
          <p>
            {activeTab === "favorites"
              ? "Start adding movies to your favorites!"
              : "Try a different search"}
          </p>
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          imdbID={selectedMovie}
          apiUrl={API_URL}
          onClose={() => setSelectedMovie(null)}
          isFavorite={isFavorite(selectedMovie)}
          onFavorite={(movie) => toggleFavorite(movie)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}

      {showScrollTop && (
        <button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}

      <footer className="app-footer">
        <p>
          Powered by{" "}
          <a href="https://www.omdbapi.com/" target="_blank" rel="noreferrer">
            OMDb API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;