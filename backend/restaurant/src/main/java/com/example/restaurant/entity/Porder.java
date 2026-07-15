package com.example.restaurant.entity;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * Porder
 */

@Entity
@Table(name = "purchaseorder")
@AllArgsConstructor
@NoArgsConstructor
public class Porder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "pordercode")
    @NotNull
    private String pordercode;

    @Column(name = "requireddate")
    @NotNull
    private LocalDate requireddate;

    @Column(name = "note")
    @NotNull
    private String note;

    @Column(name = "total")
    @NotNull
    private BigDecimal total;

    @Column(name = "status")
    @NotNull
    private Boolean status;

    // foreign key relation with table
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;

}