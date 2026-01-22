package com.example.restaurant.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

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

    @Column(name = "rop")
    @NotNull
    private BigDecimal rop;

    @Column(name = "roq")
    @NotNull
    private BigDecimal roq;

    @Column(name = "purchaseprice")
    @NotNull
    private BigDecimal purchaseprice;
}
