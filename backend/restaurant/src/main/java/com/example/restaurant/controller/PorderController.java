
package com.example.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.dao.PorderDao;
import com.example.restaurant.entity.Porder;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "api/porders")
public class PorderController {

    @Autowired
    private PorderDao porderDao;

    @GetMapping
    public List<Porder> getPorders() {
        // Implementation to retrieve and return porders

        System.out.println("Fetching all purchase orders..." + porderDao.findAll().size());
        return porderDao.findAll();
    }
}