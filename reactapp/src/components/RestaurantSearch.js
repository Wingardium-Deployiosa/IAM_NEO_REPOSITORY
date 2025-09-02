import React, { useState } from 'react';
import RestaurantService from '../utils/RestaurantService';

const RestaurantSearch = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleLocalSearch = () => {
        if (localSearchTerm) {
            RestaurantService.searchByCuisine(localSearchTerm)
                .then(response => {
                    const data = response && response.data ? response.data : response;
                    setResults(data || []);
                    setSearched(true);
                })
                .catch(() => {
                    setResults([]);
                    setSearched(true);
                });
        }
    };

    // If used as standalone component
    if (!searchTerm && !onSearchChange && !onSearchSubmit) {
        return (
            <div className="search-container">
                <input
                    data-testid="search-input"
                    type="text"
                    placeholder="Search by cuisine..."
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button data-testid="search-button" onClick={handleLocalSearch} className="search-button">
                    Search
                </button>
                {searched && results && results.length === 0 && (
                    <div data-testid="no-results">No matching restaurants found.</div>
                )}
                {results && results.map(restaurant => (
                    <div key={restaurant.id}>{restaurant.name}</div>
                ))}
            </div>
        );
    }

    // If used with props (integrated mode)
    return (
        <div className="search-container">
            <input
                data-testid="search-input"
                type="text"
                placeholder="Search by cuisine..."
                value={searchTerm}
                onChange={onSearchChange}
                className="search-input"
            />
            <button data-testid="search-button" onClick={onSearchSubmit} className="search-button">
                Search
            </button>
        </div>
    );
};

export default RestaurantSearch;