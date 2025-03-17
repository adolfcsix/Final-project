package com.btec.quanlykhohang_api.entities;


import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "suppliers")  // Maps this class to MongoDB collection
public class Supplier {

    @Id
    private String id;  // MongoDB uses String _id

    private String name;
    private String category;
    private String contact;
    private String address;
}
