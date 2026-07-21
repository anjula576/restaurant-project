package com.example.restaurant.entity;

import java.math.BigDecimal;
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
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "grn")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Grn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "billno")
    @NotNull
    private String billno;

    @Column(name = "receiveddate")
    @NotNull
    private LocalDate receiveddate;

    @Column(name = "note")
    @NotNull
    private String note;

    @Column(name = "total")
    @NotNull
    private BigDecimal total;

    @Column(name = "paidamount")
    @NotNull
    private BigDecimal paidamount;

    // foreign key relation with table
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier_id;

    // foreign key relation with table
    @ManyToOne
    @JoinColumn(name = "Purchaseorder_id", referencedColumnName = "id")
    private Porder Purchaseorder_id;
}