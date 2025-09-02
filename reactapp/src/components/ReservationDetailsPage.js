import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReservationService from '../utils/ReservationService';

const ReservationDetailsPage = () => {
  const [reservation, setReservation] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Workaround since backend doesn't have a getReservationById
    ReservationService.getAll()
      .then((response) => {
        const data = response.data || response;
        const found = Array.isArray(data) ? data.find((r) => r.id.toString() === id) : null;
        setReservation(found);
      })
      .catch((error) => console.error('Error fetching reservation details', error));
  }, [id]);

  if (!reservation) return <div>Loading reservation details...</div>;

  return (
    <div className="reservation-details-container">
      <h2>Reservation Details</h2>
      <div className="details-section">
        <h3>Booking Information</h3>
        <p><strong>Status:</strong> {reservation.status}</p>
        <p><strong>Date:</strong> {reservation.reservationDate}</p>
        <p><strong>Time:</strong> {reservation.reservationTime}</p>
        <p><strong>Party Size:</strong> {reservation.partySize}</p>
      </div>
      <div className="details-section">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> {reservation.customerName}</p>
        <p><strong>Email:</strong> {reservation.customerEmail}</p>
        <p><strong>Phone:</strong> {reservation.customerPhone}</p>
      </div>
      <Link to="/" className="back-button">Back to Dashboard</Link>
    </div>
  );
};

export default ReservationDetailsPage;

