package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.restaurant.dao.ItemDao;
import com.example.restaurant.entity.Item;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping
    public Item createItem(@RequestBody @NonNull Item item) {
        return itemDao.save(item);
    }

}
