package org.example.moviebookingbackend.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        String validUser = "CHIKU";
        String validPassword = "Nayak@1234";

        if (validUser.equalsIgnoreCase(username) && validPassword.equals(password)) {
            return ResponseEntity.ok().body("{\"message\": \"Authentication Successful\"}");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Invalid Username or Password!\"}");
        }
    }
}