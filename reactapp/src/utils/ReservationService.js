import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservations';

// Function to create a new reservation
export const createReservation = (reservationData) => {
    return axios.post(API_URL, reservationData);
};

// Function to get all reservations
export const getAllReservations = () => {
    return axios.get(API_URL);
};

// Function to get reservations for a specific restaurant
export const getReservationsByRestaurantId = (restaurantId) => {
    return axios.get(`${API_URL}/restaurant/${restaurantId}`);
};

// Function to update a reservation's status
export const updateReservationStatus = (id, status) => {
    return axios.put(`${API_URL}/${id}/status`, { status });
};

// Function to cancel (delete) a reservation
export const cancelReservation = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};