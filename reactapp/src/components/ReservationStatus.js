import React from 'react';
import ReservationService from '../utils/ReservationService';
import './ReservationStatus.css';

const ReservationStatus = ({ reservationId, status, onStatusUpdate }) => {
    const getStatusClass = () => {
        switch (status) {
            case 'CONFIRMED': return 'status-confirmed';
            case 'REJECTED': return 'status-rejected';
            case 'PENDING': default: return 'status-pending';
        }
    };

    const handleConfirm = () => {
        if (onStatusUpdate) {
            onStatusUpdate(reservationId, 'CONFIRMED');
        } else {
            ReservationService.updateStatus(reservationId, 'CONFIRMED');
        }
    };

    if (status === 'CONFIRMED') {
        return (
            <div>
                <span className={`status-badge ${getStatusClass()}`}>{status}</span>
                <button data-testid={`confirm-button-${reservationId}`} disabled>Confirm</button>
            </div>
        );
    }

    return (
        <div>
            <span className={`status-badge ${getStatusClass()}`}>{status}</span>
            <button data-testid={`confirm-button-${reservationId}`} onClick={handleConfirm}>Confirm</button>
        </div>
    );
};

export default ReservationStatus;