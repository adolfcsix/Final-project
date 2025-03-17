package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.StockMovement;
import com.btec.quanlykhohang_api.services.StockMovementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stock-movements")
public class StockMovementController {

    @Autowired
    private StockMovementService stockMovementService;

    // Get all stock movements
    @GetMapping
    public List<StockMovement> getAllStockMovements() {
        return stockMovementService.getAllStockMovements();
    }

    // Get stock movement by ID
    @GetMapping("/{id}")
    public Optional<StockMovement> getStockMovementById(@PathVariable String id) {
        return stockMovementService.getStockMovementById(id);
    }

    // Get stock movements by Product ID
    @GetMapping("/product/{productId}")
    public List<StockMovement> getStockMovementsByProductId(@PathVariable String productId) {
        return stockMovementService.getStockMovementsByProductId(productId);
    }

    // Get stock movements by Warehouse ID
    @GetMapping("/warehouse/{warehouseId}")
    public List<StockMovement> getStockMovementsByWarehouseId(@PathVariable String warehouseId) {
        return stockMovementService.getStockMovementsByWarehouseId(warehouseId);
    }

    // Get stock movements by type (IN/OUT)
    @GetMapping("/type/{movementType}")
    public List<StockMovement> getStockMovementsByType(@PathVariable String movementType) {
        return stockMovementService.getStockMovementsByType(movementType);
    }

    // Create a new stock movement
    @PostMapping
    public StockMovement createStockMovement(@RequestBody StockMovement stockMovement) {
        return stockMovementService.createStockMovement(stockMovement);
    }

    // Update a stock movement
    @PutMapping("/{id}")
    public StockMovement updateStockMovement(@PathVariable String id, @RequestBody StockMovement stockMovement) {
        return stockMovementService.updateStockMovement(id, stockMovement);
    }

    // Delete a stock movement
    @DeleteMapping("/{id}")
    public void deleteStockMovement(@PathVariable String id) {
        stockMovementService.deleteStockMovement(id);
    }
}
