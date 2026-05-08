package com.example.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "item")
@Data
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
    private BigDecimal unit;

    @Column(name = "purchaseprice")
    @NotNull
    private BigDecimal purchaseprice;

    // many to many relationship with supplier
    // an item can have many suppliers and a supplier can supply many items
    @ManyToMany
    @JoinTable(name = "item_has_supplier", joinColumns = @JoinColumn(name = "item_id"), inverseJoinColumns = @JoinColumn(name = "supplier_id"))
    private Set<Supplier> suppliers = new HashSet<>();
}
