import axios from 'axios';

const API_URL = 'http://localhost:8080/api/restaurants';

const RestaurantService = {
    getAll: () => {
        return axios.get(API_URL);
    },
    getById: (id) => {
        return axios.get(`${API_URL}/${id}`);
    },
    searchByCuisine: (cuisine) => {
        return axios.get(`${API_URL}/cuisine/${cuisine}`);
    },
    create: (restaurantData) => {
        return axios.post(API_URL, restaurantData);
    },
    update: (id, restaurantData) => {
        return axios.put(`${API_URL}/${id}`, restaurantData);
    },
    delete: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    }
};

export default RestaurantService;
