package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.restaurant.entity.Supplier;
import com.example.restaurant.dao.SupplierDao;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(value = "api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierDao supplierDao;

    public SupplierController(SupplierDao supplierDao) {
        this.supplierDao = supplierDao;
    }

    @GetMapping
    public List<Supplier> getSuppliers() {
        return supplierDao.findAll();
    }

    @SuppressWarnings("null")
    @PostMapping
    public String addSupplier(@RequestBody Supplier supplier) {
        // return supplierDao.save(supplier);

        try {

            // validation for supplier details
            if (supplier.getName() == "") {
                return "Supplier name is required";
            }
            if (supplier.getMobileno() == "") {
                return "Mobile number is required";
            }
            if (supplier.getEmail() == "") {
                return "Email is required";
            }
            if (supplier.getAddress() == "") {
                return "Address is required";
            }

            supplierDao.save(supplier);
            return "Supplier added successfully";

        } catch (Exception e) {
            System.out.println("Error saving supplier: " + e.getMessage());
            return e.getMessage();
        }
    }
}