import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../App';
import * as ReservationService from '../utils/ReservationService'
import ReservationStatus from './ReservationStatus';
import './ReservationList.css';

const ReservationList = ({ reloadKey }) => {
    const [reservations, setReservations] = useState([]);
    const { user } = useAuth();
    
    // Memoize the loadReservations function to prevent it from being recreated on every render
    const loadReservations = useCallback(() => {
        let apiCall;

if (user && user.role === 'CUSTOMER') {
apiCall = ReservationService.getReservationsByCustomerEmail(user.email);
} else {
apiCall = ReservationService.getAll();
}

apiCall
.then(response => {
setReservations(response.data);
})
.catch(error => {
console.error("Error fetching reservations!", error);
});
}, [user]);

useEffect(() => {
loadReservations();
}, [loadReservations, reloadKey]);

const handleStatusUpdate = (id, status) => {
ReservationService.updateStatus(id, status)
.then(() => loadReservations())
.catch(error => console.error("Error updating status", error));
};

const handleCancelReservation = (id) => {
if (window.confirm('Are you sure you want to cancel this reservation?')) {
ReservationService.cancel(id)
.then(() => loadReservations())
.catch(error => console.error("Error cancelling reservation!", error));
}
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
{reservations.map(res => (
<tr key={res.id}>
<td>{res.customerName}</td>
<td>{res.customerEmail}</td>
<td>{res.reservationDate} at {res.reservationTime}</td>
<td>{res.partySize}</td>
<td>
<ReservationStatus status={res.status} />
</td>
{user && user.role === 'OWNER' && (
<td>
{res.status === 'PENDING' ? (
<div className="action-buttons">
<button className="btn-confirm" onClick={() => handleStatusUpdate(res.id, 'CONFIRMED')}>Confirm</button>
<button className="btn-reject" onClick={() => handleStatusUpdate(res.id, 'REJECTED')}>Reject</button>
</div>
) : (
<button className="btn-cancel" onClick={() => handleCancelReservation(res.id)}>Cancel</button>
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