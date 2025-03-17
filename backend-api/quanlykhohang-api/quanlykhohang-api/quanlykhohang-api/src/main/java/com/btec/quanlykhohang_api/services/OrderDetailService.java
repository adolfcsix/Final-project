package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.OrderDetail;
import com.btec.quanlykhohang_api.repositories.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    // Get all order details
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    // Get order detail by ID
    public Optional<OrderDetail> getOrderDetailById(String id) {
        return orderDetailRepository.findById(id);
    }

    // Get all order details for a specific order
    public List<OrderDetail> getOrderDetailsByOrderId(String orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    // Create a new order detail
    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    // Update an order detail
    public OrderDetail updateOrderDetail(String id, OrderDetail updatedOrderDetail) {
        return orderDetailRepository.findById(id).map(orderDetail -> {
            orderDetail.setOrderId(updatedOrderDetail.getOrderId());
            orderDetail.setProductId(updatedOrderDetail.getProductId());
            orderDetail.setQuantity(updatedOrderDetail.getQuantity());
            return orderDetailRepository.save(orderDetail);
        }).orElseThrow(() -> new RuntimeException("Order Detail not found with id " + id));
    }

    // Delete an order detail
    public void deleteOrderDetail(String id) {
        orderDetailRepository.deleteById(id);
    }
}