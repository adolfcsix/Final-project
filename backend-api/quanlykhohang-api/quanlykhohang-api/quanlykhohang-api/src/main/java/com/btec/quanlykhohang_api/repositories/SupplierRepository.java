package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends MongoRepository<Supplier, String> {
    Optional<Supplier> findByName(String name);
}