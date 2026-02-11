package com.example.restaurant.dao;

import com.example.restaurant.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MenuDao extends JpaRepository<Menu, Integer> {

    @Query("SELECT m FROM Menu m WHERE m.id = ?1")
    Menu findMenuById(Integer id);
}
