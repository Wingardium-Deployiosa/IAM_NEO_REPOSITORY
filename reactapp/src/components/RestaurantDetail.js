import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantService from '../utils/RestaurantService';
import ReservationForm from './ReservationForm';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            setError('Restaurant ID is required');
            return;
        }
        RestaurantService.getById(id)
            .then((resp) => {
                const data = resp && resp.data ? resp.data : resp;
                setRestaurant(data || null);
            })
            .catch((err) => {
                console.error('Error fetching restaurant details!', err);
                setError('Failed to fetch restaurant details');
            });
    }, [id]);

    if (error) return <div data-testid="error">{error}</div>;
    if (!restaurant) return <div data-testid="loading">Loading...</div>;

    return (
        <div className="restaurant-detail-page">
            <div className="container">
                <div className="restaurant-hero">
                    <div className="restaurant-info">
                        <h1 className="restaurant-title">{restaurant.name}</h1>
                        <p>Cuisine: {restaurant.cuisine}</p>
                        <p>Address: {restaurant.address}</p>
                        <p>Hours: {restaurant.openingTime} - {restaurant.closingTime}</p>
                    </div>
                </div>
                
                <div className="reservation-section">
                    <ReservationForm restaurant={restaurant} />
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;