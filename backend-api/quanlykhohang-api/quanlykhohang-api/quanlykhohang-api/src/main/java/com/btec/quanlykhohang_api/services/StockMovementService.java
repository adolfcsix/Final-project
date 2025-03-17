package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.StockMovement;
import com.btec.quanlykhohang_api.repositories.StockMovementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockMovementService {

    @Autowired
    private StockMovementRepository stockMovementRepository;

    // Get all stock movements
    public List<StockMovement> getAllStockMovements() {
        return stockMovementRepository.findAll();
    }

    // Get stock movement by ID
    public Optional<StockMovement> getStockMovementById(String id) {
        return stockMovementRepository.findById(id);
    }

    // Get stock movements by Product ID
    public List<StockMovement> getStockMovementsByProductId(String productId) {
        return stockMovementRepository.findByProductId(productId);
    }

    // Get stock movements by Warehouse ID
    public List<StockMovement> getStockMovementsByWarehouseId(String warehouseId) {
        return stockMovementRepository.findByWarehouseId(warehouseId);
    }

    // Get stock movements by type (IN/OUT)
    public List<StockMovement> getStockMovementsByType(String movementType) {
        return stockMovementRepository.findByMovementType(movementType);
    }

    // Create a new stock movement
    public StockMovement createStockMovement(StockMovement stockMovement) {
        return stockMovementRepository.save(stockMovement);
    }

    // Update an existing stock movement
    public StockMovement updateStockMovement(String id, StockMovement updatedStockMovement) {
        return stockMovementRepository.findById(id).map(stockMovement -> {
            stockMovement.setProductId(updatedStockMovement.getProductId());
            stockMovement.setWarehouseId(updatedStockMovement.getWarehouseId());
            stockMovement.setMovementType(updatedStockMovement.getMovementType());
            stockMovement.setQuantity(updatedStockMovement.getQuantity());
            stockMovement.setDate(updatedStockMovement.getDate());
            return stockMovementRepository.save(stockMovement);
        }).orElseThrow(() -> new RuntimeException("Stock Movement not found with id " + id));
    }

    // Delete a stock movement by ID
    public void deleteStockMovement(String id) {
        stockMovementRepository.deleteById(id);
    }
}
