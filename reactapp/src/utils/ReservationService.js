import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const ReservationService = {
    create: (reservationData, restaurantId) => {
        return axios.post(`${API_BASE_URL}/restaurants/${restaurantId}/reservations`, reservationData);
    },
    getAll: () => {
        return axios.get(`${API_BASE_URL}/reservations`);
    },
    updateStatus: (id, status) => {
        return axios.put(`${API_BASE_URL}/reservations/${id}/status`, { status });
    },
    cancel: (id) => {
        return axios.delete(`${API_BASE_URL}/reservations/${id}`);
    }
};

export default ReservationService;