package com.btec.quanlikhohang_api.repositories;

import com.btec.quanlikhohang_api.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByName(String name);
}
