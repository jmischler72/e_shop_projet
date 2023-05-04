package fr.springboot.api.controller;

import fr.springboot.api.model.User;
import fr.springboot.api.repository.UserRepository;
import fr.springboot.api.security.services.UserDetailsImpl;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    UserRepository userRepository;
    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public @NotNull ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserDetailsImpl userDetails) {

        Optional<User> me = userRepository.findByEmail(userDetails.getUsername());
        if (me.isPresent()) {
            return new ResponseEntity<>(me.get() ,HttpStatus.OK);
        }
        return new ResponseEntity<>("No user found", HttpStatus.NOT_FOUND);

    }
}