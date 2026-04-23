import React, { useState } from 'react';

const TYPE_ICONS = { movie: '🎬', series: '📺', episode: '▶️' };

const MovieCard = ({ movie, index, isFavorite, onFavorite, onSelect }) => {
  const { imdbID, Year, Poster, Title, Type } = movie;
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="movie"
      style={{ '--animation-order': index }}
      onClick={() => onSelect(imdbID)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(imdbID)}
    >
      <div className="movie-poster">
        <img
          src={!imgError && Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400x600?text=No+Image'}
          alt={Title}
          onError={() => setImgError(true)}
        />
        <div className="movie-overlay">
          <span className="view-details-btn">View Details</span>
        </div>
      </div>

      <button
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={(e) => { e.stopPropagation(); onFavorite(movie); }}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div className="movie-info">
        <div className="movie-meta">
          <span className="movie-type">{TYPE_ICONS[Type] || '🎭'} {Type}</span>
          <span className="movie-year">{Year}</span>
        </div>
        <h3 className="movie-title">{Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;