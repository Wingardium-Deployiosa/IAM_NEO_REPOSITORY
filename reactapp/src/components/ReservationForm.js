import React, { useState } from 'react';
import ReservationService from '../utils/ReservationService';
import './ReservationForm.css';

const ReservationForm = ({ restaurant }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        reservationDate: '',
        reservationTime: '',
        partySize: 1,
        specialRequests: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.customerName) newErrors.customerName = 'Name is required.';
        if (!formData.customerEmail) {
            newErrors.customerEmail = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
            newErrors.customerEmail = 'Valid email is required.';
        }
        if (formData.partySize < 1 || formData.partySize > 20) {
            newErrors.partySize = 'Party size must be between 1 and 20.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            ReservationService.create(formData, restaurant.id)
                .then(() => {
                    setSuccessMessage('Reservation request submitted!');
                    // Reset form
                    setFormData({ customerName: '', customerEmail: '', customerPhone: '', reservationDate: '', reservationTime: '', partySize: 1, specialRequests: '' });
                })
                .catch(err => {
                    setErrors({ submit: 'Failed to submit reservation.' });
                    console.error(err);
                });
        }
    };

    return (
        <div className="reservation-form-container">
            <h3>Book a Table</h3>
            <form onSubmit={handleSubmit} noValidate>
                <input data-testid="name-input" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Your Name" />
                {errors.customerName && <p data-testid="error-message" className="error">{errors.customerName}</p>}
                
                <input data-testid="email-input" name="customerEmail" value={formData.customerEmail} onChange={handleChange} placeholder="Your Email" />
                {errors.customerEmail && <p className="error">{errors.customerEmail}</p>}

                <input data-testid="phone-input" name="customerPhone" value={formData.customerPhone} onChange={handleChange} placeholder="Your Phone" />
                
                <input data-testid="date-input" name="reservationDate" type="date" value={formData.reservationDate} onChange={handleChange} />
                
                <input data-testid="time-input" name="reservationTime" type="time" value={formData.reservationTime} onChange={handleChange} />

                <input data-testid="party-size-input" name="partySize" type="number" value={formData.partySize} onChange={handleChange} placeholder="Party Size" />
                {errors.partySize && <p className="error">{errors.partySize}</p>}

                <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} placeholder="Special Requests"></textarea>
                
                <button data-testid="submit-button" type="submit">Submit Reservation</button>
                {successMessage && <p data-testid="success-message">{successMessage}</p>}
                {errors.submit && <p className="error">{errors.submit}</p>}
            </form>
        </div>
    );
};
