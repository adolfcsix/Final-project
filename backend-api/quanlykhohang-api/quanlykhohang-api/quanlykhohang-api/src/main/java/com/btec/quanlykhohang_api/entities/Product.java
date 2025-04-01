package com.btec.quanlykhohang_api.entities;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "products") // Định nghĩa collection trong MongoDB
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    private String id;

    @NotBlank(message = "Product name cannot be empty")
    private String name;

    @NotBlank(message = "Category cannot be empty")
    private String category;

    @Min(value = 1, message = "Price must be greater than 0")
    private double price;

    @Min(value = 0, message = "Stock quantity cannot be negative")
    private int stockQuantity;
    private String supplierId;  // Liên kết với Supplier
    private String warehouseId; // Liên kết với Warehouse
    private String image;   // Lưu URL nếu người dùng nhập URL
}
