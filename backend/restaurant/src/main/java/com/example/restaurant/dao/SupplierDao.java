package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.entity.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Integer> {

}
