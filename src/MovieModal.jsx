import React, { useState, useEffect } from 'react';

const MovieModal = ({ imdbID, apiUrl, onClose, isFavorite, onFavorite }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}&i=${imdbID}&plot=full`);
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      }
      setLoading(false);
    };
    fetchDetails();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [imdbID, apiUrl]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
          </div>
        ) : movie ? (
          <div className="modal-content">
            <div className="modal-poster">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400x600?text=No+Image'}
                alt={movie.Title}
              />
            </div>
            <div className="modal-details">
              <div className="modal-badges">
                {movie.Year && <span className="badge-year">{movie.Year}</span>}
                {movie.Rated && movie.Rated !== 'N/A' && <span className="badge-rated">{movie.Rated}</span>}
                {movie.Runtime && movie.Runtime !== 'N/A' && <span className="badge-runtime">{movie.Runtime}</span>}
              </div>
              <h2 className="modal-title">{movie.Title}</h2>
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <div className="modal-rating">
                  <span className="star-icon">⭐</span>
                  <span className="rating-value">{movie.imdbRating}</span>
                  <span className="rating-votes">({movie.imdbVotes} votes)</span>
                </div>
              )}
              {movie.Genre && movie.Genre !== 'N/A' && (
                <div className="modal-genres">
                  {movie.Genre.split(', ').map((g) => (
                    <span key={g} className="genre-tag">{g}</span>
                  ))}
                </div>
              )}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <p className="modal-plot">{movie.Plot}</p>
              )}
              <div className="modal-crew">
                {movie.Director && movie.Director !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Director</span>
                    <span className="crew-value">{movie.Director}</span>
                  </div>
                )}
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Cast</span>
                    <span className="crew-value">{movie.Actors}</span>
                  </div>
                )}
                {movie.Language && movie.Language !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Language</span>
                    <span className="crew-value">{movie.Language}</span>
                  </div>
                )}
                {movie.Country && movie.Country !== 'N/A' && (
                  <div className="crew-item">
                    <span className="crew-label">Country</span>
                    <span className="crew-value">{movie.Country}</span>
                  </div>
                )}
              </div>
              <button
                className={`modal-fav-btn ${isFavorite ? 'favorited' : ''}`}
                onClick={() => onFavorite(movie)}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        ) : (
          <div className="modal-error">Failed to load movie details.</div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
