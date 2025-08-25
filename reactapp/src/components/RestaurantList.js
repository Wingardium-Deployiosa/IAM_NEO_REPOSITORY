import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantService from '../utils/RestaurantService';
import RestaurantSearch from './RestaurantSearch';
import './RestaurantList.css';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRestaurants = (cuisine = '') => {
        setLoading(true);
        setError(null);
        
        const apiCall = cuisine 
            ? RestaurantService.searchByCuisine(cuisine) 
            : RestaurantService.getAll();

        apiCall
            .then(response => {
                setRestaurants(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch restaurants');
                setLoading(false);
                console.error(err);
            });
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    if (loading) return <div data-testid="loading">Loading...</div>;
    if (error) return <div data-testid="error">{error}</div>;

    return (
        <div className="restaurant-list-container">
            <h2>All Restaurants</h2>
            <RestaurantSearch onSearch={fetchRestaurants} />
            <div className="restaurant-grid">
                {restaurants.length > 0 ? (
                    restaurants.map(restaurant => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="restaurant-card-link">
                            <div className="restaurant-card">
                                <h3>{restaurant.name}</h3>
                                <p>Cuisine: {restaurant.cuisine}</p>
                                <p>{restaurant.address}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div data-testid="no-results">No matching restaurants found.</div>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;
