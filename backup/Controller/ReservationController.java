package com.examly.springapp.Controller;

import com.examly.springapp.model.Reservation;
import com.examly.springapp.model.ReservationStatus;
import com.examly.springapp.model.Restaurant;
import com.examly.springapp.repository.ReservationRepository;
import com.examly.springapp.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ReservationController {

@Autowired
private ReservationRepository reservationRepository;

@Autowired
private RestaurantRepository restaurantRepository;

@PostMapping("/restaurants/{restaurantId}/reservations")
public ResponseEntity<?> createReservation(@PathVariable Long restaurantId, @RequestBody Reservation reservation) {
Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(restaurantId);
if (!optionalRestaurant.isPresent()) {
return new ResponseEntity<>("Restaurant not found with id: " + restaurantId, HttpStatus.NOT_FOUND);
}
Restaurant restaurant = optionalRestaurant.get();

if (reservation.getReservationTime().isBefore(restaurant.getOpeningTime()) || reservation.getReservationTime().isAfter(restaurant.getClosingTime())) {
return new ResponseEntity<>("Reservation time must be within restaurant opening hours.", HttpStatus.BAD_REQUEST);
}

List<Reservation> existingReservations = reservationRepository.findByRestaurant_IdAndReservationDate(restaurantId, reservation.getReservationDate());
if (existingReservations.size() >= restaurant.getTotalTables()) {
return new ResponseEntity<>("No available tables for the selected date.", HttpStatus.BAD_REQUEST);
}

reservation.setRestaurant(restaurant);
reservation.setStatus(ReservationStatus.PENDING);
Reservation savedReservation = reservationRepository.save(reservation);
return new ResponseEntity<>(savedReservation, HttpStatus.CREATED);
}

@GetMapping("/reservations/{id}")
public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
Optional<Reservation> reservation = reservationRepository.findById(id);
return reservation.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
}

@GetMapping("/reservations")
public ResponseEntity<List<Reservation>> getAllReservations() {
List<Reservation> reservations = reservationRepository.findAll();
return new ResponseEntity<>(reservations, HttpStatus.OK);
}
@GetMapping("/reservations/customer/{email}")
public ResponseEntity<List<Reservation>> getReservationsByCustomerEmail(@PathVariable String email) {
List<Reservation> reservations = reservationRepository.findByCustomerEmail(email);
return new ResponseEntity<>(reservations, HttpStatus.OK);
}

@PutMapping("/reservations/{id}/status")
public ResponseEntity<Reservation> updateReservationStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
Optional<Reservation> optionalReservation = reservationRepository.findById(id);
if (optionalReservation.isPresent()) {
Reservation reservation = optionalReservation.get();
ReservationStatus status = ReservationStatus.valueOf(statusUpdate.get("status").toUpperCase());
reservation.setStatus(status);
Reservation updatedReservation = reservationRepository.save(reservation);
return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
} else {
return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}
}

@DeleteMapping("/reservations/{id}")
public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
if (reservationRepository.existsById(id)) {
reservationRepository.deleteById(id);
return new ResponseEntity<>(HttpStatus.NO_CONTENT);
} else {
return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}
}
}
