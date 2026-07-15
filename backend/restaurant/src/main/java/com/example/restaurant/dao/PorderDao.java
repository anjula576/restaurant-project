package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.entity.Porder;

public interface PorderDao extends JpaRepository<Porder, Integer> {

}
