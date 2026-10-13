package com.example.acxiom_backend.controller;

import com.example.acxiom_backend.model.Opportunity;
import com.example.acxiom_backend.repository.OpportunityRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin(origins = "http://localhost:5173")
public class OpportunityController {

    @Autowired
    private OpportunityRepository opportunityRepository;

    @GetMapping
    public List<Opportunity> getAllOpportunities() {
        return opportunityRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createOpportunity(@Valid @RequestBody Opportunity opp) {
        if (opp.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Opportunity Amount must be greater than 0.");
        }
        if (opp.getProbability() < 0 || opp.getProbability() > 100) {
            return ResponseEntity.badRequest().body("Probability must be between 0 and 100.");
        }
        if (opp.getExpectedCloseDate() != null && opp.getExpectedCloseDate().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body("Expected Close Date cannot be in the past.");
        }
        Opportunity saved = opportunityRepository.save(opp);
        return ResponseEntity.ok(saved);
    }
}