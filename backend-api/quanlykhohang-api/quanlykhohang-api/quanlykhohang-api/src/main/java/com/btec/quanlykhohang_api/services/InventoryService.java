package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Inventory;
import com.btec.quanlykhohang_api.repositories.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // Get all inventory records
    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    // Get inventory by ID
    public Optional<Inventory> getInventoryById(String id) {
        return inventoryRepository.findById(id);
    }

    // Get inventory by Product ID
    public List<Inventory> getInventoryByProductId(String productId) {
        return inventoryRepository.findByProductId(productId);
    }

    // Get inventory by Warehouse ID
    public List<Inventory> getInventoryByWarehouseId(String warehouseId) {
        return inventoryRepository.findByWarehouseId(warehouseId);
    }

    // Get inventory by Product ID and Warehouse ID
    public Optional<Inventory> getInventoryByProductAndWarehouse(String productId, String warehouseId) {
        return inventoryRepository.findByProductIdAndWarehouseId(productId, warehouseId);
    }

    // Create or update inventory record
    public Inventory saveInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // Update stock level
    public Inventory updateStockLevel(String id, int stockLevel) {
        return inventoryRepository.findById(id).map(inventory -> {
            inventory.setStockLevel(stockLevel);
            return inventoryRepository.save(inventory);
        }).orElseThrow(() -> new RuntimeException("Inventory record not found with id " + id));
    }

    // Delete an inventory record
    public void deleteInventory(String id) {
        inventoryRepository.deleteById(id);
    }
}
