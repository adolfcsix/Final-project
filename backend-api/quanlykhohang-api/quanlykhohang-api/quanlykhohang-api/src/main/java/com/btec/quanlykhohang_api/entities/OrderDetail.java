package com.btec.quanlykhohang_api.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "order_details")  // Maps this class to MongoDB collection
public class OrderDetail {

    @Id
    private String id;  // MongoDB uses String _id

    @Field("order_id")
    private String orderId;

    @Field("product_id")
    private String productId;

    private int quantity;
}
