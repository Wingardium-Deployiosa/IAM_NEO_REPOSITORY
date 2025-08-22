import axios from 'axios';

const API_URL = 'http://localhost:8080/api/restaurants';

// Function to get all restaurants
export const getAllRestaurants = () => {
    return axios.get(API_URL);
};

// Function to get a single restaurant by its ID
export const getRestaurantById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Function to search restaurants by cuisine
export const searchByCuisine = (cuisine) => {
    return axios.get(`${API_URL}/cuisine/${cuisine}`);
};

// Function to create a new restaurant
export const createRestaurant = (restaurantData) => {
    return axios.post(API_URL, restaurantData);
};

// Function to update an existing restaurant
export const updateRestaurant = (id, restaurantData) => {
    return axios.put(`${API_URL}/${id}`, restaurantData);
};

// Function to delete a restaurant
export const deleteRestaurant = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};