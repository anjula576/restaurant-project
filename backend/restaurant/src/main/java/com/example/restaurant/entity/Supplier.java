package com.example.restaurant.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "supplier")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "mobileno")
    @NotNull
    private String mobileno;

    @Column(name = "email")
    @NotNull
    private String email;

    @Column(name = "address")
    @NotNull
    private String address;
}
