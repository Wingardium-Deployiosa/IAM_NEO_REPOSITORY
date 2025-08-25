import React, { useState } from 'react';
import ReservationService from '../utils/ReservationService';
import './ReservationForm.css';

const ReservationForm = ({ restaurantId, onReservationSuccess }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [reservationDate, setReservationDate] = useState('');
    const [reservationTime, setReservationTime] = useState('');
    const [partySize, setPartySize] = useState(1);
    const [specialRequests, setSpecialRequests] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const reservationData = { customerName, customerEmail, customerPhone, reservationDate, reservationTime, partySize, specialRequests };

        ReservationService.create(reservationData, restaurantId)
            .then(() => {
                setMessage('Reservation successful! Your booking is pending confirmation.');
                setCustomerName(''); setCustomerEmail(''); setCustomerPhone(''); setReservationDate(''); setReservationTime(''); setPartySize(1); setSpecialRequests('');
                
                if (onReservationSuccess) {
                    onReservationSuccess();
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data || 'Failed to make reservation. Please try again.';
                setMessage(errorMessage);
                console.error('Reservation error:', error);
            });
    };


return (
<div className="reservation-form-container">
<h3>Book a Table</h3>
<form onSubmit={handleSubmit}>
<input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Your Name" required />
<input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="Your Email" required />
<input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Phone Number" required />
<input type="date" value={reservationDate} onChange={e => setReservationDate(e.target.value)} required />
<input type="time" value={reservationTime} onChange={e => setReservationTime(e.target.value)} required />
<input type="number" value={partySize} onChange={e => setPartySize(parseInt(e.target.value))} min="1" placeholder="Party Size" required />
<textarea value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} placeholder="Special Requests (optional)"></textarea>
<button type="submit">Reserve</button>
</form>
{message && <p>{message}</p>}
</div>
);
};
export default ReservationForm;