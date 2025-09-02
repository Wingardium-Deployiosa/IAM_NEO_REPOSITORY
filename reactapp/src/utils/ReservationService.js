import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservations';

const ReservationService = {
    create: (reservationData) => axios.post(API_URL, reservationData),
    getAll: () => axios.get(API_URL),
    getByRestaurantId: (restaurantId) => axios.get(`${API_URL}/restaurant/${restaurantId}`),
    updateStatus: (id, status) => axios.put(`${API_URL}/${id}/status`, { status }),
    cancel: (id) => axios.delete(`${API_URL}/${id}`)
};

export default ReservationService;

// Named exports for backward compatibility
export const createReservation = ReservationService.create;
export const getAllReservations = ReservationService.getAll;
export const getReservationsByRestaurantId = ReservationService.getByRestaurantId;
export const updateReservationStatus = ReservationService.updateStatus;
export const cancelReservation = ReservationService.cancel;