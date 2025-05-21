import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getCitySuggestions } from '../utils/getCitySuggestions';
import './SearchBar.css'; // CSS file included below

const SearchBar = ({ onCityChange }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (city.length > 2) {
                try {
                    const results = await getCitySuggestions(city);
                    setSuggestions(results);
                    setError('');
                } catch (error) {
                    if (error.response?.status === 429) {
                        setError('Too many requests. Please wait a few seconds and try again.');
                    } else {
                        setError('Something went wrong. Try again.');
                    }
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
                setError('');
            }
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [city]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCityChange(city);
    };

    const handleSuggestionClick = (suggestedCity) => {
        setCity(suggestedCity);
        onCityChange(suggestedCity);
        setSuggestions([]);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input-wrapper">
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={handleCityChange}
                    autoFocus
                    autoComplete="off"
                    className="search-input"
                />
                <button type="submit" className="search-button" title="Search">
                    <FaSearch />
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
};

export default SearchBar;
