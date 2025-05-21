import React from 'react';
import './Favourites.css'; // Import the CSS

const Favourites = ({ favourites, onSelect, onDelete }) => {
  return (
    <div className="favourites-container">
      <h3 className="favourites-heading">Favourites</h3>
      {favourites.length === 0 ? (
        <p className="no-favourites">No favourites added yet.</p>
      ) : (
        <ul className="favourites-list">
          {favourites.map((city) => (
            <li key={city} className="favourite-item">
              <span className="city-name">{city}</span>
              <div className="button-group">
                <button className="select-btn" onClick={() => onSelect(city)}>
                  Select
                </button>
                <button className="delete-btn" onClick={() => onDelete(city)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
