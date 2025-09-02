package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Reservation;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
 List<Reservation> findByRestaurant_IdAndReservationDate(Long restaurantId, LocalDate date);
 
 // --- NEW FEATURE ---
 // This method will find all reservations for a specific customer.
 List<Reservation> findByCustomerEmail(String customerEmail);

 List<Reservation> findByRestaurantId(Long restaurantId);
}