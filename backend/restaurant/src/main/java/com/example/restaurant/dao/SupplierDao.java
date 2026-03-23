package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.restaurant.model.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Integer> {
	
}
