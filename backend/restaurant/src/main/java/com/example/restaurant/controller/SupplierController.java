package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.GetMapping;
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
}