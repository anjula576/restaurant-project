package com.example.restaurant.controller;

import com.example.restaurant.dao.CustomerDao;
import com.example.restaurant.dao.MenuDao;
import com.example.restaurant.entity.Customer;
import com.example.restaurant.entity.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/menuitems")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class MenuController {

    @Autowired
    private MenuDao menuDao;

    @GetMapping
    public List<Menu> getCustomers(){

        return menuDao.findAll();
    }


}
