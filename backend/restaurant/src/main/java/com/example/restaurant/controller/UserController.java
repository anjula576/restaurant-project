package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

//      this made for testing purpose
    @GetMapping
    public List<String> getUsers() {
        return List.of("Anjula", "Kamal", "Nimal","Sunimal");
    }

    @PostMapping
    public String addUser(@RequestBody String name) {
        return "User " + name + " added!";
    }
}
