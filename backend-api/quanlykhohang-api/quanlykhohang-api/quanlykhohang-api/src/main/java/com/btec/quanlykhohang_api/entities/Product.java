package com.btec.quanlykhohang_api.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "products") // Định nghĩa collection trong MongoDB
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    private String id;
    private String name;
    private String description;
    private String category;
    private String supplierId;  // Liên kết với Supplier
    private double price;
    private int stockQuantity;
    private String warehouseId; // Liên kết với Warehouse
    private String imageUrl;   // Lưu URL nếu người dùng nhập URL
    private String imageBase64; // Lưu Base64 nếu người dùng upload ảnh từ máy
}
