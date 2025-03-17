package com.btec.quanlykhohang_api.entities;

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
    private String id;  // MongoDB automatically assigns an ObjectId

    private String userId;  // Reference to a user (customer)

    private String category;

    private LocalDateTime orderDate;

    private String status; // Example values: "Pending", "Shipped", "Delivered", "Cancelled"
}
