package com.example.restaurant.entity;

import java.math.BigDecimal;
import java.util.List;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import lombok.ToString;

@Entity
@Table(name = "purchaseorder_has_item")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PorderItem {


   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "quantity")
    @NotNull
    private Integer quantity;

    @Column(name = "price")
    @NotNull
    private BigDecimal price;

    @Column(name = "porder_id")
    @NotNull
    private Integer porder_id;
    
    @ManyToOne
    @JoinColumn(name = "Purchaseorder_id",referencedColumnName = "id")
    @JsonIgnore // to avoid infinite recursion during serialization (when converting to JSON)
    @ToString.Exclude // to avoid infinite recursion during toString() method
    private Porder Purchaseorder_id;

    @OneToMany
    @JoinColumn(name = "Item_id", referencedColumnName = "id")
    private List<Item>  item_id;

}
