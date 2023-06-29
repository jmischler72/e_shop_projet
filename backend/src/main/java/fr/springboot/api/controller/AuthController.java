package fr.springboot.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import fr.springboot.api.model.ERole;
import fr.springboot.api.model.User;
import fr.springboot.api.payload.request.LoginRequest;
import fr.springboot.api.payload.request.SignupRequest;

import fr.springboot.api.payload.response.JwtResponse;
import fr.springboot.api.repository.UserRepository;
import fr.springboot.api.security.jwt.JwtUtils;
import fr.springboot.api.security.services.UserDetailsImpl;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    AuthenticationManager authenticationManager;

    UserRepository userRepository;

    PasswordEncoder encoder;

    JwtUtils jwtUtils;


    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));


        String strRole = signUpRequest.getRole();

        ERole userRole = null;

        if (strRole == null) {
            userRole = ERole.ROLE_USER;

        } else {
            switch (strRole) {
                case "admin":
                    userRole = ERole.ROLE_ADMIN;
                    break;
                default:
                    userRole = ERole.ROLE_USER;
            }
        }

        user.setRole(userRole);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}