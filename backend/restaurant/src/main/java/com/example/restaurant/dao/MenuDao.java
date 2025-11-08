package com.example.restaurant.dao;

import com.example.restaurant.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MenuDao extends JpaRepository<Menu,Integer> {
}
