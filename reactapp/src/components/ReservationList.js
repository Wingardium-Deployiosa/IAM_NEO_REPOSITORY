import React, { useState, useEffect } from 'react';
import ReservationService from '../utils/ReservationService';
import ReservationStatus from './ReservationStatus';
import './ReservationList.css';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = () => {
        ReservationService.getAll()
            .then(response => setReservations(response.data))
            .catch(error => console.error("Error fetching reservations", error));
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleStatusUpdate = (id, status) => {
        ReservationService.updateStatus(id, status)
            .then(() => fetchReservations()) // Refresh list on success
            .catch(error => console.error("Error updating status", error));
    };
    
    const handleCancel = (id) => {
        ReservationService.cancel(id)
            .then(() => fetchReservations()) // Refresh list on success
            .catch(error => console.error("Error canceling reservation", error));
    };

    if (reservations.length === 0) {
        return <div data-testid="empty">No reservations found.</div>;
    }

    return (
        <div className="reservation-list-container">
            <h2>All Reservations</h2>
            <div className="reservation-items">
                {reservations.map(res => (
                    <div key={res.id} data-testid={`reservation-item-${res.id}`} className="reservation-item">
                        <p><strong>Customer:</strong> {res.customerName}</p>
                        <p><strong>Date:</strong> {res.reservationDate} at {res.reservationTime}</p>
                        <ReservationStatus 
                            reservationId={res.id} 
                            status={res.status} 
                            onStatusUpdate={handleStatusUpdate} 
                        />
                        <button data-testid={`cancel-button-${res.id}`} onClick={() => handleCancel(res.id)}>Cancel</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservationList;
