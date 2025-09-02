import React, { useState, useEffect } from 'react';
import RestaurantService from '../utils/RestaurantService';
import ReservationService from '../utils/ReservationService';
import { useAuth } from '../AuthContext';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [availableSeats, setAvailableSeats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      RestaurantService.getByOwner(user.email)
        .then(response => {
          const ownerRestaurants = response.data || [];
          setRestaurants(ownerRestaurants);
          
          // Fetch available seats for each restaurant
          const seatsPromises = ownerRestaurants.map(restaurant => 
            RestaurantService.getAvailableSeats(restaurant.id)
              .then(seatsResponse => ({ id: restaurant.id, seats: seatsResponse.data }))
              .catch(() => ({ id: restaurant.id, seats: { availableSeats: restaurant.totalTables * 4, availableTables: restaurant.totalTables } }))
          );
          
          return Promise.all([ReservationService.getAll(), Promise.all(seatsPromises)]);
        })
        .then(([reservationResponse, seatsResults]) => {
          const allReservations = reservationResponse.data || [];
          const ownerReservations = allReservations.filter(reservation => 
            restaurants.some(restaurant => restaurant.id === reservation.restaurant?.id)
          );
          setReservations(ownerReservations);
          
          // Set available seats data
          const seatsData = {};
          seatsResults.forEach(result => {
            seatsData[result.id] = result.seats;
          });
          setAvailableSeats(seatsData);
          
          setLoading(false);
        })
        .catch((error) => {
          alert('Failed to load your restaurants and reservations.');
          setRestaurants([]);
          setReservations([]);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div>Loading your restaurants...</div>;

  return (
    <div className="owner-dashboard">
      <h2>My Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found for your account.</p>
      ) : (
        <div>
          <div className="restaurant-grid">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image" style={restaurant.imageUrl ? {
                  backgroundImage: `url(${restaurant.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '150px',
                  borderRadius: '8px 8px 0 0'
                } : {
                  background: 'linear-gradient(135deg, #fc8019 0%, #ff6900 100%)',
                  height: '150px',
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: '600'
                }}>
                  {!restaurant.imageUrl && <span>{restaurant.cuisine}</span>}
                </div>
                <div style={{ padding: '16px' }}>
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.address}</p>
                  <p>Cuisine: {restaurant.cuisine}</p>
                  <p>Hours: {restaurant.openingTime} - {restaurant.closingTime}</p>
                  <p>Tables: {restaurant.totalTables}</p>
                  <p>Available Today: {availableSeats[restaurant.id]?.availableSeats || 'Loading...'} seats ({availableSeats[restaurant.id]?.availableTables || 'Loading...'} tables)</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reservations-section">
            <h3>Recent Reservations</h3>
            {reservations.length === 0 ? (
              <p>No reservations found for your restaurants.</p>
            ) : (
              <div className="reservations-list">
                {reservations.map(reservation => (
                  <div key={reservation.id} className="reservation-item">
                    <p><strong>{reservation.customerName}</strong> - {reservation.reservationDate} at {reservation.reservationTime}</p>
                    <p>Party size: {reservation.partySize} | Status: {reservation.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;