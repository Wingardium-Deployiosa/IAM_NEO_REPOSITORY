package com.examly.springapp.Repository;

 

import com.examly.springapp.Model.Restaurant;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

 

@Repository

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

  List<Restaurant> findByCuisineIgnoreCase(String cuisine);

}

 