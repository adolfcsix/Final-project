package com.btec.quanlykhohang_api.controllers;


import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        return orderService.updateOrder(id, updatedOrder);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
    }
}
