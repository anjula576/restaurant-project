package com.example.restaurant.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;

import com.example.restaurant.dao.CustomerDao;
import com.example.restaurant.dao.OrderDao;
import com.example.restaurant.entity.Customer;
import com.example.restaurant.entity.Order;
import com.example.restaurant.entity.OrderItem;

@RestController
// without this annotation, react frontend will not be able to access this api
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping(value = "api/orders")
public class OrderController {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private CustomerDao customerDao;

    @GetMapping
    public List<Order> getOrders() {
        // Implementation to retrieve and return orders
        return orderDao.findAll();
    }

    @PostMapping
    public String createOrder(@RequestBody Order order) {
        // Implementation to create a new order

        try {
            // You can add validation or processing logic here

            if (order == null) {
                return "Error creating order: Order object is null";

            }

            // Set the order date to current date and time
            order.setOrderdate(LocalDateTime.now());

            for (OrderItem item : order.getOrderItems()) {

                item.setOrders_id(order);

            }

            orderDao.save(order);

            return "Order created successfully";

        } catch (Exception e) {
            return "Error creating order: " + e.getMessage();
        }

    }
}
