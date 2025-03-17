package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.OrderDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends MongoRepository<OrderDetail, String> {

    List<OrderDetail> findByOrderId(String orderId);  // Find order details by OrderID
}