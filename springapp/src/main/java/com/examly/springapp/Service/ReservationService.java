package com.examly.springapp.service;

import com.examly.springapp.model.Reservation;
import com.examly.springapp.model.ReservationStatus;
import com.examly.springapp.model.Restaurant;
import com.examly.springapp.repository.ReservationRepository;
import com.examly.springapp.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Reservation createReservation(Reservation reservation) {
        // --- Business Logic: Check if reservation time is valid ---
        Restaurant restaurant = restaurantRepository.findById(reservation.getRestaurantId()).orElse(null);
        if (restaurant == null) {
            // In a real app, you'd throw a custom exception here
            return null;
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime openingTime = LocalTime.parse(restaurant.getOpeningTime(), formatter);
        LocalTime closingTime = LocalTime.parse(restaurant.getClosingTime(), formatter);
        LocalTime reservationTime = LocalTime.parse(reservation.getReservationTime(), formatter);

        if (reservationTime.isBefore(openingTime) || reservationTime.isAfter(closingTime)) {
            // This is where you would throw your ValidationException
            // For now, we can return null to indicate failure
            throw new IllegalArgumentException("Reservation time must be within restaurant opening hours.");
        }

        reservation.setStatus(ReservationStatus.PENDING);
        return reservationRepository.save(reservation);
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }
    
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<Reservation> getReservationsByRestaurantId(Long restaurantId) {
        return reservationRepository.findByRestaurantId(restaurantId);
    }

    public Reservation updateReservationStatus(Long id, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(id).orElse(null);
        if (reservation != null) {
            reservation.setStatus(status);
            return reservationRepository.save(reservation);
        }
        return null;
    }

    public void cancelReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}