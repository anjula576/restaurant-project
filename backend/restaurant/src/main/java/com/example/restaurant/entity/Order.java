package com.example.restaurant.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
@Table(name = "Order")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "totalamount")
    @NotNull
    private BigDecimal totalamount;

    @Column(name = "status")
    @NotNull
    private boolean status;

    @Column(name = "paymentstatus")
    @NotNull
    private boolean paymentstatus;

    @Column(name = "orderdate")
    @NotNull
    private LocalDateTime orderdate;

    // foreign key relation with customer
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer_id;

    // foreign key relation with table
    @ManyToOne
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    private Reservation reservation_id;

    // foreign key relation with table
    @ManyToOne
    @JoinColumn(name = "table_id", referencedColumnName = "id")
    private Customer table_id;

    // many to many relation with orderitem through orderitem table
    // need to create list to hold multiple order items
    @OneToMany(mappedBy = "order_id", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

}
