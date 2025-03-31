package com.btec.quanlykhohang_api.entities;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Document(collection = "suppliers")  // Maps this class to MongoDB collection
public class Supplier {

    @Id
    private String id;
    private String name;
    private String address;
    private String contactNumber;

}
