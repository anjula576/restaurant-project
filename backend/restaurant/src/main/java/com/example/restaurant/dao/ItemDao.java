package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.entity.Item;

public interface ItemDao extends JpaRepository<Item, Integer> {

}
