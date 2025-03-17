package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Order;
import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.repositories.OrderRepository;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    // Get orders by user ID
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    // Get orders by status
    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    // Create a new order
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now()); // Set order date to now
        return orderRepository.save(order);
    }

    // Update an existing order
    public Order updateOrder(String id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setUserId(updatedOrder.getUserId());
            order.setCategory(updatedOrder.getCategory());
            order.setOrderDate(updatedOrder.getOrderDate());
            order.setStatus(updatedOrder.getStatus());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with id " + id));
    }

    // Delete an order by ID
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}
