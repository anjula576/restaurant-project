package com.example.restaurant.entity;

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
@Table(name = "reservation")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "reservationdate")
    @NotNull
    private LocalDate reservationdate;

    @Column(name = "status")
    @NotNull
    private boolean status;

    @Column(name = "duration")
    @NotNull
    private String duration;

    // foreign key relation with table
    @ManyToOne
    @JoinColumn(name = "table_id", referencedColumnName = "id")
    private Table table_id;

}
