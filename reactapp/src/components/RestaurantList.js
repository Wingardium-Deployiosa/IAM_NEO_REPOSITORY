import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRestaurants, searchByCuisine, createRestaurant, deleteRestaurant } from '../utils/RestaurantService';
import RestaurantSearch from './RestaurantSearch';
import { useAuth } from '../App';
import './RestaurantList.css'; 
import './RestaurantSearch.css';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    
    // State for the "Add Restaurant" form
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [openingTime, setOpeningTime] = useState('11:00');
    const [closingTime, setClosingTime] = useState('22:00');
    const [totalTables, setTotalTables] = useState(10);
    const [error, setError] = useState('');

    useEffect(() => {
        loadRestaurants();
    }, []);

    const loadRestaurants = () => {
        getAllRestaurants()
            .then(response => setRestaurants(response.data))
            .catch(error => console.error("There was an error fetching the restaurants!", error));
    };

    const handleSearchChange = (event) => setSearchTerm(event.target.value);
    
    const handleSearchSubmit = () => {
        if (searchTerm) {
            searchByCuisine(searchTerm)
                .then(response => setRestaurants(response.data))
                .catch(error => console.error("Error searching by cuisine!", error));
        } else {
            loadRestaurants();
        }
    };
    
    const handleAddRestaurantSubmit = (event) => {
        event.preventDefault();
        const restaurantData = { name, address, cuisine, openingTime, closingTime, totalTables };
        
        createRestaurant(restaurantData)
            .then(() => {
                alert('Restaurant added successfully!');
                setName(''); setAddress(''); setCuisine(''); setError('');
                loadRestaurants();
            })
            .catch(err => {
                setError('Failed to add restaurant. Please try again.');
                console.error(err);
            });
    };

    const handleDeleteRestaurant = (id) => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            deleteRestaurant(id)
                .then(() => loadRestaurants())
                .catch(error => console.error("Error deleting restaurant!", error));
        }
    };

    return (
        <div className="restaurant-list-container">
            {user && user.role === 'OWNER' && (
                <div className="add-restaurant-form">
                    <h3>Add a New Restaurant</h3>
                    <form onSubmit={handleAddRestaurantSubmit}>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
                        <input type="text" value={cuisine} onChange={e => setCuisine(e.target.value)} placeholder="Cuisine" required />
                        <input type="text" value={openingTime} onChange={e => setOpeningTime(e.target.value)} placeholder="Opening Time (HH:mm)" required />
                        <input type="text" value={closingTime} onChange={e => setClosingTime(e.target.value)} placeholder="Closing Time (HH:mm)" required />
                        <input type="number" value={totalTables} onChange={e => setTotalTables(parseInt(e.target.value))} placeholder="Total Tables" required />
                        <button type="submit">Add Restaurant</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            )}
            
            <hr />

            <h2>Restaurants</h2>
            <RestaurantSearch 
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />
            <div className="restaurant-grid">
                {restaurants.length > 0 ? (
                    restaurants.map(restaurant => (
                        <div key={restaurant.id} className="restaurant-card-wrapper">
                            <Link to={`/restaurants/${restaurant.id}`} className="restaurant-card-link">
                                <div className="restaurant-card">
                                    <h3>{restaurant.name}</h3>
                                    <p>{restaurant.address}</p>
                                    <p>Cuisine: {restaurant.cuisine}</p>
                                    <p>Hours: {restaurant.openingTime} - {restaurant.closingTime}</p>
                                </div>
                            </Link>
                            {user && user.role === 'OWNER' && (
                                <button className="btn-delete-restaurant" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
            </div>
        </div>
    );
};

export default RestaurantList;