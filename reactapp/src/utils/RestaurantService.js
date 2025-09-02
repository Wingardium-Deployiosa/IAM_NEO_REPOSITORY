import axios from 'axios';

const API_URL = 'http://localhost:8080/api/restaurants';

const RestaurantService = {
    getAll: () => axios.get(API_URL),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    searchByCuisine: (cuisine) => axios.get(`${API_URL}/cuisine/${cuisine}`),
    create: (restaurantData) => axios.post(API_URL, restaurantData),
    update: (id, restaurantData) => axios.put(`${API_URL}/${id}`, restaurantData),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
};

export default RestaurantService;

// Named exports for backward compatibility
export const getAllRestaurants = RestaurantService.getAll;
export const getRestaurantById = RestaurantService.getById;
export const searchByCuisine = RestaurantService.searchByCuisine;
export const createRestaurant = RestaurantService.create;
export const updateRestaurant = RestaurantService.update;
export const deleteRestaurant = RestaurantService.delete;