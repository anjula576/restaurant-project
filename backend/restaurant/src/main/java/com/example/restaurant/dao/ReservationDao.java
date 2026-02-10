package com.example.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurant.entity.Reservation;

public interface ReservationDao extends JpaRepository<Reservation, Integer> {

}
