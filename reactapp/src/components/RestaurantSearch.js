import React from 'react';

const RestaurantSearch = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search by cuisine..."
                value={searchTerm}
                onChange={onSearchChange}
                className="search-input"
            />
            <button onClick={onSearchSubmit} className="search-button">
                Search
            </button>
        </div>
    );
};

export default RestaurantSearch;