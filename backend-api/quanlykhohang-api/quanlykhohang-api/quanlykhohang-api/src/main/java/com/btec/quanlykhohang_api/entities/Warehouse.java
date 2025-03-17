package com.btec.quanlykhohang_api.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "warehouses") // Maps to MongoDB "warehouses" collection
public class Warehouse {

    @Id
    private String id;  // MongoDB automatically assigns an ObjectId

    private String location;

    private int capacity;
}
