package com.examly.springapp.repository;

import com.examly.springapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // This method will be used by the login function to find a user by their email.
    // Spring Data JPA automatically creates the query based on the method name.
    Optional<User> findByEmail(String email);
}