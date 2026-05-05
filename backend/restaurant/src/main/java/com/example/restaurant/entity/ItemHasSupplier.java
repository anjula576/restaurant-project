package com.example.restaurant.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

@Entity(name = "item_has_supplier")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemHasSupplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    // Constructors, getters, and setters
}