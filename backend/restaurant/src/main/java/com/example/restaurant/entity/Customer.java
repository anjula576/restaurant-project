package com.example.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name="customer")
@Data
public class Customer {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "firstname")
    @NotNull
    private String firstname;

    @Column(name = "lastname")
    @NotNull
    private String lastname;

    @Column(name = "mobileno")
    @NotNull
    private String mobileno;

    @Column(name = "email")
    @NotNull
    private String email;

    @Column(name = "status")
    @NotNull
    private Boolean status;
}
