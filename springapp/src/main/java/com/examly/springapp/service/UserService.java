package com.examly.springapp.service;

import com.examly.springapp.model.Restaurant;
import com.examly.springapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public boolean validateOwnerCredentials(String email, String password) {
        Restaurant restaurant = restaurantRepository.findByOwnerEmail(email).stream().findFirst().orElse(null);
        return restaurant != null && restaurant.getOwnerPassword().equals(password);
    }
}