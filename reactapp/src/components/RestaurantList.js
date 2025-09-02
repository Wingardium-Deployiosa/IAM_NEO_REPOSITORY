import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RestaurantService from '../utils/RestaurantService';
import RestaurantSearch from './RestaurantSearch';
import { useAuth } from '../AuthContext';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [availableSeats, setAvailableSeats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const authResult = useAuth();
  const user = authResult ? authResult.user : null;

  useEffect(() => {
    loadRestaurants();
    
    // Listen for reservation updates to refresh available seats
    const handleReservationUpdate = () => {
      loadRestaurants();
    };
    
    window.addEventListener('reservationUpdated', handleReservationUpdate);
    
    return () => {
      window.removeEventListener('reservationUpdated', handleReservationUpdate);
    };
  }, []);

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const response = await RestaurantService.getAll();
      const data = response && response.data ? response.data : response;
      const restaurantList = Array.isArray(data) ? data : [];
      setRestaurants(restaurantList);
      setAllRestaurants(restaurantList);
      
      // Fetch available seats for each restaurant
      const seatsData = {};
      for (const restaurant of restaurantList) {
        try {
          if (RestaurantService.getAvailableSeats) {
            const seatsResponse = await RestaurantService.getAvailableSeats(restaurant.id);
            const seatsData_temp = seatsResponse && seatsResponse.data ? seatsResponse.data : seatsResponse;
            console.log(`Available seats for restaurant ${restaurant.id}:`, seatsData_temp);
            seatsData[restaurant.id] = seatsData_temp;
          } else {
            seatsData[restaurant.id] = { availableSeats: restaurant.totalTables * 4, availableTables: restaurant.totalTables };
          }
        } catch (err) {
          console.error(`Error fetching seats for restaurant ${restaurant.id}:`, err);
          seatsData[restaurant.id] = { availableSeats: restaurant.totalTables * 4, availableTables: restaurant.totalTables }; // Default to total capacity
        }
      }
      setAvailableSeats(seatsData);
    } catch (err) {
      setError('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearchSubmit = (term) => {
    if (!term) {
      setRestaurants(allRestaurants);
      return;
    }
    setRestaurants(allRestaurants.filter(r => 
      (r.cuisine || '').toLowerCase().includes(term.toLowerCase()) ||
      (r.name || '').toLowerCase().includes(term.toLowerCase())
    ));
  };

  const isAdmin = user && user.role && user.role.toUpperCase() === 'ADMIN';

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Failed to fetch restaurants</div>;

  return (
    <div className="restaurant-list-page">
      <div className="hero-section">
        <div className="container">
          <h1>Discover Great Places to Dine</h1>
          <p>Book tables at your favorite restaurants</p>
          <RestaurantSearch onSearch={handleSearchSubmit} />
        </div>
      </div>
      
      <div className="container">
        <div className="restaurants-section">
          <h2 className="section-title">All Restaurants</h2>
          
          <div className="restaurant-grid">
            {restaurants.length > 0 ? (
              restaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant-card-wrapper">
                  <Link to={`/restaurants/${restaurant.id}`} className="restaurant-card-link">
                    <div className="restaurant-card">
                      <div className="restaurant-image" style={restaurant.imageUrl ? {
                        backgroundImage: `url(${restaurant.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      } : {}}>
                        <div className="cuisine-badge">{restaurant.cuisine}</div>
                      </div>
                      <div className="restaurant-info">
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                        <p className="restaurant-address">{restaurant.address}</p>
                        <div className="restaurant-meta">
                          <span className="rating">★ 4.2</span>
                          <span className="delivery-time">25-30 mins</span>
                          <span className="cost">₹300 for two</span>
                          <span className="available-seats">
                            {availableSeats[restaurant.id]?.availableSeats === 0 ? 'Restaurant Full' : 
                             availableSeats[restaurant.id] ? `Available Today: ${availableSeats[restaurant.id].availableSeats} seats (${availableSeats[restaurant.id].availableTables} tables)` : 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {isAdmin && (
                    <button className="btn-delete" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this restaurant?')) {
                        RestaurantService.delete(restaurant.id)
                          .then(() => {
                            alert('Restaurant deleted successfully!');
                            loadRestaurants();
                          })
                          .catch(() => {
                            alert('Failed to delete restaurant. Please try again.');
                          });
                      }
                    }}>Delete</button>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results" data-testid="no-results">
                <h3>No restaurants found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
