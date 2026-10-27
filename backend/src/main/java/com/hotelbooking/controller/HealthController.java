package com.hotelbooking.controller;

import java.time.Instant;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A tiny endpoint used to confirm the backend is running and that the
 * React frontend can reach it. Open http://localhost:8080/api/health
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
                "status", "UP",
                "service", "hotel-booking-backend",
                "time", Instant.now().toString());
    }
}
