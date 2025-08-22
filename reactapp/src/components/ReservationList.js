import React, { useState, useEffect } from 'react';
import { getAllReservations, updateReservationStatus } from '../utils/ReservationService';
import ReservationStatus from './ReservationStatus';
import { useAuth } from '../App';
import './ReservationList.css';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        loadReservations();
    }, []);

    const loadReservations = () => {
        getAllReservations()
            .then(response => setReservations(response.data))
            .catch(error => console.error("Error fetching reservations!", error));
    };

    const handleStatusUpdate = (id, status) => {
        updateReservationStatus(id, status)
            .then(() => loadReservations())
            .catch(error => console.error("Error updating reservation status!", error));
    };

    return (
        <div className="reservation-list-container">
            <h2>All Reservations</h2>
            <table className="reservations-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Date & Time</th>
                        <th>Party Size</th>
                        <th>Status</th>
                        {user && user.role === 'OWNER' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{reservation.customerName}</td>
                            <td>{reservation.customerEmail}</td>
                            <td>{reservation.reservationDate} at {reservation.reservationTime}</td>
                            <td>{reservation.partySize}</td>
                            <td>
                                <ReservationStatus status={reservation.status} />
                            </td>
                            {user && user.role === 'OWNER' && (
                                <td>
                                    {reservation.status === 'PENDING' && (
                                        <div className="action-buttons">
                                            <button className="btn-confirm" onClick={() => handleStatusUpdate(reservation.id, 'CONFIRMED')}>Confirm</button>
                                            <button className="btn-reject" onClick={() => handleStatusUpdate(reservation.id, 'REJECTED')}>Reject</button>
                                        </div>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationList;