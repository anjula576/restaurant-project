package com.example.restaurant.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "purchaseorder")
@AllArgsConstructor
@NoArgsConstructor
@Data
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

    // Many purchase orders can belong to one supplier
    @ManyToOne
    @JoinColumn(name = "supplier_id", referencedColumnName = "id")
    private Supplier supplier;

    // One purchase order can have many purchase order items
    @OneToMany(mappedBy = "Purchaseorder_id", cascade = CascadeType.ALL)
    private List<PorderItem> porderItems;

}