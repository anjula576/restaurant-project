package com.example.restaurant.service;

import com.example.restaurant.dao.CustomerDao;
import com.example.restaurant.entity.Customer;
import org.springframework.stereotype.Service;


//service layer is optional one
// this codes can be written in the controller file also
//this is more structured way
// controller files handle http request only.this is more scalable .also write the validations here.
@Service
public class CustomerService {

    //to work this variable should inject the dependency like below
    private final CustomerDao customerDao;


//     without this dependency injection above variable doesn't work
//     this occur an error (find more about dependency injection)
    public CustomerService(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    public Customer savecustomer(Customer customer){

        return customerDao.save(customer);
    }
}
