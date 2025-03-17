package com.btec.quanlykhohang_api.entities;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String email;
    private String password;
    private String username;
    private String address;
    private Set<String> roles;
    private LocalDateTime createdAt = LocalDateTime.now();
}
