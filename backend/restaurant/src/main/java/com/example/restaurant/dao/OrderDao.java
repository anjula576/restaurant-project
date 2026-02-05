package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.restaurant.entity.Order;

public interface OrderDao extends JpaRepository<Order, Integer> {

}
