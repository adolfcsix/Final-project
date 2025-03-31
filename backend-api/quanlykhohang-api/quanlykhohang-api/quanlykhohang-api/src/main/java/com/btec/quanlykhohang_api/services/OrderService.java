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

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        order.setOrderDate(java.time.Instant.now());
        return orderRepository.save(order);
    }

    public Order updateOrder(String id, Order updatedOrder) {
        return orderRepository.findById(id).map(order -> {
            order.setOrderType(updatedOrder.getOrderType());
            order.setProductId(updatedOrder.getProductId());
            order.setSupplierId(updatedOrder.getSupplierId());
            order.setWarehouseId(updatedOrder.getWarehouseId());
            order.setQuantity(updatedOrder.getQuantity());
            order.setTotalPrice(updatedOrder.getTotalPrice());
            order.setStatus(updatedOrder.getStatus());
            order.setOrderedBy(updatedOrder.getOrderedBy());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}
