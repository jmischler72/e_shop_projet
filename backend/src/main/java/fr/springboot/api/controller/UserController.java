package fr.springboot.api.controller;

import fr.springboot.api.model.User;
import fr.springboot.api.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") Long id) {
        Optional<User> user = userRepository.findById(id);

        if(!user.isPresent()) {
            return new ResponseEntity<>("No account matches this id", HttpStatus.NOT_FOUND);
        }

        userRepository.delete(user.get());

        return new ResponseEntity<>("User deleted", HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User userUpdated) {
        Optional<User> user = userRepository.findById(userUpdated.getId());

        if(!user.isPresent()) {
            return new ResponseEntity<>("No account matches this id", HttpStatus.NOT_FOUND);
        }

        userUpdated.hashPassword();
        user.get().setEmail(userUpdated.getEmail());
        user.get().setPassword(userUpdated.getPassword());
        userRepository.save(user.get());

        return new ResponseEntity<>("User updated", HttpStatus.OK);
    }
}
