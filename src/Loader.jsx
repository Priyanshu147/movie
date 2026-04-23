import React from 'react';

const Loader = () => (
  <div className="loader-container">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="skeleton-card" style={{ '--animation-order': i }}>
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
          <div className="skeleton-line short"></div>
          <div className="skeleton-line long"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Loader;
