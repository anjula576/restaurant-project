
package com.example.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    public String savePorder(Porder porder) {
        // Implementation to save a new porder

        try {

            porderDao.save(porder);
            return "ok";
        } catch (Exception e) {
            System.out.println("Error saving purchase order: " + e.getMessage());
            return "error" + e.getMessage();
        }

    }

    @DeleteMapping("/{id}")
    public String deletePorder(@PathVariable Integer id) {
        try {
            porderDao.deleteById(id);
            return "ok";
        } catch (Exception e) {
            System.out.println("Error deleting purchase order: " + e.getMessage());
            return "error" + e.getMessage();
        }
    }
}