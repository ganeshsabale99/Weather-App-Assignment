import React, { useState } from 'react';

const SearchBar = ({ onCityChange }) => {
    const [city, setCity] = useState('');

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCityChange(city);
    };


    console.log('City:', city);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={handleCityChange}
                required
                autoFocus
                autoComplete="off"
                className="search-bar"  
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;