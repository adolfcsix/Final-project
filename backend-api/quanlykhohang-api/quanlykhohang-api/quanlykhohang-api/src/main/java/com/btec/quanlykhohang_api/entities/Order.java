package com.btec.quanlykhohang_api.entities;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "orders") // Maps to MongoDB "orders" collection
public class Order {

    @Id
    private String id;
    private String orderType; // purchase | sale
    private String productId;
    private String supplierId;
    private String warehouseId;
    private int quantity;
    private double totalPrice;
    private String status;  // pending | completed | canceled
    private String orderedBy;
    private Instant orderDate;
}
