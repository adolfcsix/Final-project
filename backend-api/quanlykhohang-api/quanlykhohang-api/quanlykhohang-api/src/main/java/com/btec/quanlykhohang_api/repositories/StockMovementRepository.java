package com.btec.quanlykhohang_api.repositories;

import com.btec.quanlykhohang_api.entities.StockMovement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMovementRepository extends MongoRepository<StockMovement, String> {

    List<StockMovement> findByProductId(String productId);

    List<StockMovement> findByWarehouseId(String warehouseId);

    List<StockMovement> findByMovementType(String movementType);
}