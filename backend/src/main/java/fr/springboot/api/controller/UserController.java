package fr.springboot.api.controller;

import fr.springboot.api.model.User;
import fr.springboot.api.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("api/login")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/create")
    public @NotNull ResponseEntity<?> createUser(@RequestBody User user) {
        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(user.getEmail());
        if(!matcher.matches()) {
            return new ResponseEntity<>("Bad email", HttpStatus.BAD_REQUEST);
        }

        List<User> existingUser = userRepository.findByEmail(user.getEmail());
        if(existingUser.size() > 0) {
            return new ResponseEntity<>("This email is already used", HttpStatus.CONFLICT);
        }

        user.hashPassword();
        userRepository.save(user);

        return new ResponseEntity<>("User created", HttpStatus.OK);
    }

    @GetMapping("/connect/{email}/{password}")
    public ResponseEntity<?> connectUser(@PathVariable(value = "email") String email, @PathVariable(value = "password") String password) {
        List<User> user = userRepository.findByEmail(email);

        if(user.size() < 1) {
            return new ResponseEntity<>("No account matches this email", HttpStatus.NOT_FOUND);
        }

        if(!user.get(0).getPassword().equals(String.valueOf(password.hashCode()))) {
            return new ResponseEntity<>("Bad password", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user.get(0), HttpStatus.OK);
    }
}
