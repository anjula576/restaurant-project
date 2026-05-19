package com.example.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "item")

// don't use @Data because it will generate toString method which will cause
// infinite loop when we try to print the object
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "itemname")
    @NotNull
    private String itemname;

    @Column(name = "availableqty")
    @NotNull
    private BigDecimal availableqty;

    @Column(name = "totalqty")
    @NotNull
    private BigDecimal totalqty;

    @Column(name = "unit")
    @NotNull
    private String unit;

    @Column(name = "purchaseprice")
    @NotNull
    private BigDecimal purchaseprice;

    @ManyToMany
    @JoinTable(name = "item_has_supplier", joinColumns = @JoinColumn(name = "item_id"), inverseJoinColumns = @JoinColumn(name = "supplier_id"))
    private Set<Supplier> suppliers = new HashSet<>();
}