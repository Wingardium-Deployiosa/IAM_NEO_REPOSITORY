package com.examly.springapp.Service;

import com.examly.springapp.Exception.ResourceNotFoundException;
import com.examly.springapp.Model.Reservation;
import com.examly.springapp.Model.ReservationStatus;
import com.examly.springapp.Model.Restaurant;
import com.examly.springapp.Repository.ReservationRepository;
import com.examly.springapp.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private RestaurantRepository restaurantRepository;

    public Reservation create(Reservation reservation, Long restaurantId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + restaurantId));
        
        reservation.setRestaurant(restaurant);
        reservation.setStatus(ReservationStatus.PENDING);
        return reservationRepository.save(reservation);
    }

    public void cancel(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        reservationRepository.delete(reservation);
    }
    
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
    
    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }
    
    public Reservation updateStatus(Long id, ReservationStatus status) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            Reservation res = reservation.get();
            res.setStatus(status);
            return reservationRepository.save(res);
        }
        throw new ResourceNotFoundException("Reservation not found with id: " + id);
    }
}