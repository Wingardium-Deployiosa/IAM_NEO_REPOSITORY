import React from 'react';
import './ReservationStatus.css';

const ReservationStatus = ({ reservationId, status, onStatusUpdate }) => {
    return (
        <div className="status-container">
            <span>Status: {status}</span>
            {status === 'PENDING' && (
                <>
                    <button 
                        data-testid={`confirm-button-${reservationId}`} 
                        onClick={() => onStatusUpdate(reservationId, 'CONFIRMED')}
                    >
                        Confirm
                    </button>
                </>
            )}
            {status === 'CONFIRMED' && (
                 <button data-testid={`confirm-button-${reservationId}`} disabled>Confirmed</button>
            )}
        </div>
    );
};

export default ReservationStatus;
