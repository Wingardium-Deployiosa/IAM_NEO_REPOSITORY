package com.examly.springapp.repository;

 

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Restaurant;

import java.util.List;

 

@Repository

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

  List<Restaurant> findByCuisineIgnoreCase(String cuisine);

}

 