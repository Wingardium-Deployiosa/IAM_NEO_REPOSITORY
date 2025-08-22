package com.examly.springapp.repository;

import com.examly.springapp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    
    // Custom query method to find restaurants by cuisine type
    List<Restaurant> findByCuisine(String cuisine);
}