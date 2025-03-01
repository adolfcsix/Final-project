package com.btec.quanlikhohang_api.controllers;

import com.btec.quanlikhohang_api.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam String username, @RequestParam String password) {
        authService.registerUser(username, password);
        return ResponseEntity.ok("User registered successfully!");
    }
}
