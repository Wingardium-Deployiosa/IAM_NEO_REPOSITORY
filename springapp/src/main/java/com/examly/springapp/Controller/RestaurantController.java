package com.examly.springapp.Controller;

import com.examly.springapp.Model.Restaurant;
import com.examly.springapp.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

@Autowired
private RestaurantRepository restaurantRepository;

@PostMapping
public ResponseEntity<Restaurant> createRestaurant(@RequestBody Restaurant restaurant) {
Restaurant savedRestaurant = restaurantRepository.save(restaurant);
return new ResponseEntity<>(savedRestaurant, HttpStatus.CREATED);
}

@GetMapping("/{id}")
public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
Optional<Restaurant> restaurant = restaurantRepository.findById(id);
if (restaurant.isPresent()) {
return new ResponseEntity<>(restaurant.get(), HttpStatus.OK);
} else {
return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}
}

@GetMapping
public ResponseEntity<List<Restaurant>> getAllRestaurants() {
List<Restaurant> restaurants = restaurantRepository.findAll();
return new ResponseEntity<>(restaurants, HttpStatus.OK);
}

@GetMapping("/cuisine/{cuisine}")
public ResponseEntity<List<Restaurant>> searchByCuisine(@PathVariable String cuisine) {
List<Restaurant> restaurants = restaurantRepository.findByCuisineIgnoreCase(cuisine);
return new ResponseEntity<>(restaurants, HttpStatus.OK);
}

@PutMapping("/{id}")
public ResponseEntity<Restaurant> updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurantDetails) {
Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(id);
if (optionalRestaurant.isPresent()) {
Restaurant existingRestaurant = optionalRestaurant.get();
existingRestaurant.setName(restaurantDetails.getName());
existingRestaurant.setAddress(restaurantDetails.getAddress());
existingRestaurant.setCuisine(restaurantDetails.getCuisine());
existingRestaurant.setOpeningTime(restaurantDetails.getOpeningTime());
existingRestaurant.setClosingTime(restaurantDetails.getClosingTime());
existingRestaurant.setTotalTables(restaurantDetails.getTotalTables());
Restaurant updatedRestaurant = restaurantRepository.save(existingRestaurant);
return new ResponseEntity<>(updatedRestaurant, HttpStatus.OK);
} else {
return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
if (restaurantRepository.existsById(id)) {
restaurantRepository.deleteById(id);
return new ResponseEntity<>(HttpStatus.NO_CONTENT);
} else {
return new ResponseEntity<>(HttpStatus.NOT_FOUND);
}
}
}