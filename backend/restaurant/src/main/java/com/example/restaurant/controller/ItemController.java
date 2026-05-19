package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.dao.ItemDao;
import com.example.restaurant.entity.Item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(value = "api/items")
public class ItemController {

    @Autowired
    private ItemDao itemDao;

    @GetMapping
    public List<Item> getItems() {
        return itemDao.findAll();

    }

}
