package com.btec.quanlykhohang_api.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "inventories") // MongoDB collection name
public class Inventory {

    @Id
    private String id; // MongoDB automatically assigns an ObjectId

    private String productId; // References the Product model

    private String warehouseId; // References the Warehouse model

    private int stockLevel; // Current stock level in the warehouse
}
