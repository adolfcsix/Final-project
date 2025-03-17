package com.btec.quanlykhohang_api.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "products") // Định nghĩa collection trong MongoDB
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    private String id;  // MongoDB uses String _id

    private String name;
    private String category;
    private LocalDateTime createdDate;
    private int quantity;
    private double price;
    private String supplierId; // Foreign Key reference (SupplierID)
}
