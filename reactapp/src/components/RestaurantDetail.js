import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantService from '../utils/RestaurantService';
import ReservationForm from './ReservationForm';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        RestaurantService.getById(id)
            .then(response => {
                setRestaurant(response.data);
            })
            .catch(error => {
                console.error("Error fetching restaurant details!", error);
            });
    }, [id]);

    if (!restaurant) return <div>Loading...</div>;

    return (
        <div className="detail-container">
            <div className="detail-card">
                <h2>{restaurant.name}</h2>
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Hours:</strong> {restaurant.openingTime} - {restaurant.closingTime}</p>
            </div>
            <ReservationForm restaurant={restaurant} />
        </div>
    );
};

export default RestaurantDetail;