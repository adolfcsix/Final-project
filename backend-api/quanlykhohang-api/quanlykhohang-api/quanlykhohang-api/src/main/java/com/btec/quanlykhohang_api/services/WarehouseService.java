package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Warehouse;
import com.btec.quanlykhohang_api.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    // Get all warehouses
    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
    }

    // Get warehouse by ID
    public Optional<Warehouse> getWarehouseById(String id) {
        return warehouseRepository.findById(id);
    }

    // Get warehouses by location
    public List<Warehouse> getWarehousesByLocation(String location) {
        return warehouseRepository.findByLocation(location);
    }

    // Create a new warehouse
    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    // Update an existing warehouse
    public Warehouse updateWarehouse(String id, Warehouse updatedWarehouse) {
        return warehouseRepository.findById(id).map(warehouse -> {
            warehouse.setLocation(updatedWarehouse.getLocation());
            warehouse.setCapacity(updatedWarehouse.getCapacity());
            return warehouseRepository.save(warehouse);
        }).orElseThrow(() -> new RuntimeException("Warehouse not found with id " + id));
    }

    // Delete a warehouse by ID
    public void deleteWarehouse(String id) {
        warehouseRepository.deleteById(id);
    }
}
