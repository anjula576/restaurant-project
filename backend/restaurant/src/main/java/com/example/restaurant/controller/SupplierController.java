package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.dao.SupplierDao;
import com.example.restaurant.entity.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
// without this annotation, react frontend will not be able to access this api
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(value = "api/suppliers")
class SupplierController {
 
@Autowired
private SupplierDao supplierDao;


@GetMapping
public List<Supplier> getSuppliers() {
    // Implementation to retrieve and return suppliers
    return supplierDao.findAll();
	

}

}

package com.example.restaurant.dao;

import com.example.restaurant.entity.Supplier;
import java.util.List;

public interface SupplierDao {
    List<Supplier> findAll();
    // other methods...
}