package com.example.restaurant.entity;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quantity")
    @NotNull
    private Integer quantity;

    @Column(name = "price")
    @NotNull
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private Order order_id;

    @ManyToOne
    @JoinColumn(name = "Menuitem_id", referencedColumnName = "id")
    private Menu Menuitem_id;
}
