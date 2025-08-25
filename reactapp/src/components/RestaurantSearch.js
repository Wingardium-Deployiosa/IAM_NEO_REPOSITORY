import React, { useState } from 'react';
import './RestaurantSearch.css';

const RestaurantSearch = ({ onSearch }) => {
    const [cuisine, setCuisine] = useState('');

    const handleSearch = () => {
        onSearch(cuisine);
    };

    return (
        <div className="search-container">
            <input
                data-testid="search-input"
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Search by cuisine..."
                className="search-input"
            />
            <button data-testid="search-button" onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
};

export default RestaurantSearch;
