import React from 'react';
import './ReservationStatus.css';

const ReservationStatus = ({ status }) => {
    const getStatusClass = () => {
        switch (status) {
            case 'CONFIRMED': return 'status-confirmed';
            case 'REJECTED': return 'status-rejected';
            case 'PENDING': default: return 'status-pending';
        }
    };
    return (<span className={`status-badge ${getStatusClass()}`}>{status}</span>);
};

export default ReservationStatus;