package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.OrderDetail;
import com.btec.quanlykhohang_api.services.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    // Get all order details
    @GetMapping
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    // Get order detail by ID
    @GetMapping("/{id}")
    public Optional<OrderDetail> getOrderDetailById(@PathVariable String id) {
        return orderDetailService.getOrderDetailById(id);
    }

    // Get order details by OrderID
    @GetMapping("/order/{orderId}")
    public List<OrderDetail> getOrderDetailsByOrderId(@PathVariable String orderId) {
        return orderDetailService.getOrderDetailsByOrderId(orderId);
    }

    // Create a new order detail
    @PostMapping
    public OrderDetail createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return orderDetailService.createOrderDetail(orderDetail);
    }

    // Update an order detail
    @PutMapping("/{id}")
    public OrderDetail updateOrderDetail(@PathVariable String id, @RequestBody OrderDetail orderDetail) {
        return orderDetailService.updateOrderDetail(id, orderDetail);
    }

    // Delete an order detail
    @DeleteMapping("/{id}")
    public void deleteOrderDetail(@PathVariable String id) {
        orderDetailService.deleteOrderDetail(id);
    }
}
