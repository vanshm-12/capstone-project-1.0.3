package com.example.demo.user.service;

import com.example.demo.user.dto.AuthResponse;
import com.example.demo.user.dto.SignInRequest;
import com.example.demo.user.dto.SignUpRequest;
import com.example.demo.user.model.User;
import com.example.demo.user.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(SignUpRequest request) {
        String normalizedEmail = request.getEmail().toLowerCase().trim();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = new User(
                request.getName().trim(),
                normalizedEmail,
                passwordEncoder.encode(request.getPassword())
        );

        User saved = userRepository.save(user);
        String token = UUID.randomUUID().toString();
        return new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), "User registered successfully", token);
    }

    public AuthResponse login(SignInRequest request) {
        String normalizedEmail = request.getEmail().toLowerCase().trim();
        Optional<User> userOpt = userRepository.findByEmail(normalizedEmail);

        if (userOpt.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOpt.get().getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        User user = userOpt.get();
        String token = UUID.randomUUID().toString();
        return new AuthResponse(user.getId(), user.getName(), user.getEmail(), "Login successful", token);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email.toLowerCase().trim());
    }
}
