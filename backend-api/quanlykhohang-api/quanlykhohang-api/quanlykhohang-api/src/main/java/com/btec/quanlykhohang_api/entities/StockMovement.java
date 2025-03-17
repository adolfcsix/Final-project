package com.btec.quanlykhohang_api.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "stock_movements") // Maps to MongoDB "stock_movements" collection
public class StockMovement {

    @Id
    private String id; // MongoDB automatically assigns an ObjectId

    private String productId; // References the Product model

    private String warehouseId; // References the Warehouse model

    private String movementType; // IN or OUT

    private int quantity;

    private Date date;
}
