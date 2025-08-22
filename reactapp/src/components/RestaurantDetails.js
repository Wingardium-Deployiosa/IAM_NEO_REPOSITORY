import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../utils/RestaurantService';
import ReservationForm from './ReservationForm';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getRestaurantById(id)
            .then(response => setRestaurant(response.data))
            .catch(error => console.error("Error fetching restaurant details!", error));
    }, [id]);

    if (!restaurant) return <div>Loading restaurant details...</div>;

    return (
        <div className="detail-container">
            <div className="detail-card">
                <h2>{restaurant.name}</h2>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                <p><strong>Hours:</strong> {restaurant.openingTime} - {restaurant.closingTime}</p>
                <p><strong>Tables Available:</strong> {restaurant.totalTables}</p>
            </div>
            <ReservationForm restaurantId={id} />
        </div>
    );
};

export default RestaurantDetail;