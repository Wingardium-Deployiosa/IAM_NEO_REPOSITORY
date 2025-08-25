package com.examly.springapp.Service;

import com.examly.springapp.Exception.ResourceNotFoundException;
import com.examly.springapp.Model.Restaurant;
import com.examly.springapp.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RestaurantService {

 @Autowired
 private RestaurantRepository restaurantRepository;

 public Restaurant createRestaurant(Restaurant restaurant) {
 return restaurantRepository.save(restaurant);
 }

 public Restaurant getRestaurantById(Long id) {
 return restaurantRepository.findById(id)
 .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
 }

 public List<Restaurant> getAllRestaurants() {
 return restaurantRepository.findAll();
 }

 public Restaurant updateRestaurant(Long id, Restaurant restaurantDetails) {
 Restaurant restaurant = getRestaurantById(id); // Re-uses the findById logic to ensure it exists
 restaurant.setName(restaurantDetails.getName());
 restaurant.setAddress(restaurantDetails.getAddress());
 restaurant.setCuisine(restaurantDetails.getCuisine());
 restaurant.setOpeningTime(restaurantDetails.getOpeningTime());
 restaurant.setClosingTime(restaurantDetails.getClosingTime());
 restaurant.setTotalTables(restaurantDetails.getTotalTables());
 return restaurantRepository.save(restaurant);
 }

 public void deleteRestaurant(Long id) {
 Restaurant restaurant = getRestaurantById(id); // Ensures restaurant exists before deleting
 restaurantRepository.delete(restaurant);
 }

 public List<Restaurant> searchByCuisine(String cuisine) {
 // This method name matches the test file's requirement
 return restaurantRepository.findByCuisineIgnoreCase(cuisine);
 }
}