// src/components/AdminHome.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReservationService from '../utils/ReservationService';
import { useAuth } from '../AuthContext';

const AdminHome = () => {
  const [recentReservations, setRecentReservations] = useState([]);
  const { user } = useAuth() || {};

  useEffect(() => {
    let mounted = true;
    ReservationService.getAll()
      .then((response) => {
        const data = response && response.data ? response.data : response;
        const sorted = Array.isArray(data) ? data.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate)) : [];
        if (mounted) setRecentReservations(sorted.slice(0, 5));
      })
      .catch((error) => console.error('Error fetching reservations', error));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="admin-home-container">
      <h2>Hello, {user?.name || 'Admin'}!</h2>
      <p>Welcome to your control panel. Here are the most recent bookings.</p>

      <div className="recent-bookings">
        <h3>Recent Bookings</h3>
        {recentReservations.length > 0 ? (
          recentReservations.map((res) => (
            <div key={res.id} className="booking-summary-card">
              <p>
                <strong>Customer:</strong> {res.customerName}
              </p>
              <p>
                <strong>Date:</strong> {res.reservationDate} at {res.reservationTime}
              </p>
              <p>
                <strong>Status:</strong> {res.status}
              </p>
              <Link to={`/reservations/${res.id}`} className="details-button">
                See Details
              </Link>
            </div>
          ))
        ) : (
          <p>No recent bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
