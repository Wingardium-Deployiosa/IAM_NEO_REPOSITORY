import React, { useState, useEffect } from 'react';
import ReservationService from '../utils/ReservationService';
import ReservationStatus from './ReservationStatus';
import './ReservationList.css';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        ReservationService.getAll()
            .then(response => {
                const data = response && response.data ? response.data : response;
                setReservations(data || []);
            })
            .catch(() => setReservations([]));
    }, []);

    const handleCancelReservation = (id) => {
        ReservationService.cancel(id)
            .then(() => {
                setReservations(prev => prev.filter(r => r.id !== id));
            })
            .catch(() => {});
    };

    if (!reservations || reservations.length === 0) {
        return <div data-testid="empty">No reservations found.</div>;
    }

    return (
        <div className="reservation-list-container">
            <h2>All Reservations</h2>
            {reservations.map(res => (
                <div key={res.id} data-testid={`reservation-item-${res.id}`} className="reservation-item">
                    <h3>{res.customerName}</h3>
                    <p>{res.customerEmail}</p>
                    <p>{res.reservationDate} at {res.reservationTime}</p>
                    <p>Party size: {res.partySize}</p>
                    <ReservationStatus reservationId={res.id} status={res.status} />
                    <button data-testid={`cancel-button-${res.id}`} onClick={() => handleCancelReservation(res.id)}>Cancel</button>
                </div>
            ))}
        </div>
    );
};

export default ReservationList;