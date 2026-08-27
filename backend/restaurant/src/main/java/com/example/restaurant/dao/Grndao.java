package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.entity.Grn;

public interface GrnDao extends JpaRepository<Grn, Integer>  {
    
}
