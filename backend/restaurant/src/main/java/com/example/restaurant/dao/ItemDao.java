package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.restaurant.entity.Item;

public interface ItemDao extends JpaRepository<Item, Integer> {

    @Query("SELECT i FROM item i WHERE i.id = ?1")
    Item findItemById(Integer id);

}
