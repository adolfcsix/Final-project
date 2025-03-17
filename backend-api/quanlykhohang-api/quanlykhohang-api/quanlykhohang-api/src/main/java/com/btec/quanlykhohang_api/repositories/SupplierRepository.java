package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends MongoRepository<Supplier, String> {

    List<Supplier> findByCategory(String category); // Custom query to find suppliers by category
}
