package com.example.restaurant.controller;

import com.example.restaurant.dao.CustomerDao;
import com.example.restaurant.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/customer")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class CustomerController {

    @Autowired
    private CustomerDao customerDao;

    @GetMapping
    public List<Customer> getCustomers() {

        return customerDao.findAll();
    }

    // post mapping for save customer
    @PostMapping
    public String saveCustomer(@RequestBody Customer customer) {

        try {
            // You can add validation or processing logic here
            // check if customer is not null
            if (customer != null) {
                customerDao.save(customer);
                return "Customer saved successfully";
            } else {
                return "Error saving customer: Customer object is null";
            }
        } catch (Exception e) {
            // Handle exception (e.g., log it)
            return "Error saving customer: " + e.getMessage();
        }

    }

    // mapping for update
    @PutMapping("/{id}")
    public void updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) {
        customer.setId(id);
        customerDao.save(customer);
    }

    // mapping for delete

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Integer id) {

        customerDao.deleteById(id);
    }

}
