package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.Warehouse;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends MongoRepository<Warehouse, String> {

    List<Warehouse> findByLocation(String location);  // Find warehouses by location
}
