package com.examly.springapp.repository;

import com.examly.springapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    
    // Custom query method to find all reservations for a given restaurant
    List<Reservation> findByRestaurantId(Long restaurantId);
}