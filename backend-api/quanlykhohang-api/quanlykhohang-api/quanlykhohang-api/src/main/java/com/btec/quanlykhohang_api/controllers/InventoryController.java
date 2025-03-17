package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Inventory;
import com.btec.quanlykhohang_api.services.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventories")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Get all inventory records
    @GetMapping
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    // Get inventory by ID
    @GetMapping("/{id}")
    public Optional<Inventory> getInventoryById(@PathVariable String id) {
        return inventoryService.getInventoryById(id);
    }

    // Get inventory by Product ID
    @GetMapping("/product/{productId}")
    public List<Inventory> getInventoryByProductId(@PathVariable String productId) {
        return inventoryService.getInventoryByProductId(productId);
    }

    // Get inventory by Warehouse ID
    @GetMapping("/warehouse/{warehouseId}")
    public List<Inventory> getInventoryByWarehouseId(@PathVariable String warehouseId) {
        return inventoryService.getInventoryByWarehouseId(warehouseId);
    }

    // Get inventory by Product ID and Warehouse ID
    @GetMapping("/product/{productId}/warehouse/{warehouseId}")
    public Optional<Inventory> getInventoryByProductAndWarehouse(@PathVariable String productId, @PathVariable String warehouseId) {
        return inventoryService.getInventoryByProductAndWarehouse(productId, warehouseId);
    }

    // Create or update an inventory record
    @PostMapping
    public Inventory saveInventory(@RequestBody Inventory inventory) {
        return inventoryService.saveInventory(inventory);
    }

    // Update stock level
    @PutMapping("/{id}/stock")
    public Inventory updateStockLevel(@PathVariable String id, @RequestParam int stockLevel) {
        return inventoryService.updateStockLevel(id, stockLevel);
    }

    // Delete an inventory record
    @DeleteMapping("/{id}")
    public void deleteInventory(@PathVariable String id) {
        inventoryService.deleteInventory(id);
    }
}
