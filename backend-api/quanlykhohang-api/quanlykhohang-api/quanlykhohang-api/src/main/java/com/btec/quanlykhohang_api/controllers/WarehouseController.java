package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Warehouse;
import com.btec.quanlykhohang_api.services.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/warehouses")
public class WarehouseController {

    @Autowired
    private WarehouseService warehouseService;

    // Get all warehouses
    @GetMapping
    public List<Warehouse> getAllWarehouses() {
        return warehouseService.getAllWarehouses();
    }

    // Get warehouse by ID
    @GetMapping("/{id}")
    public Optional<Warehouse> getWarehouseById(@PathVariable String id) {
        return warehouseService.getWarehouseById(id);
    }

    // Get warehouses by location
    @GetMapping("/location/{location}")
    public List<Warehouse> getWarehousesByLocation(@PathVariable String location) {
        return warehouseService.getWarehousesByLocation(location);
    }

    // Create a new warehouse
    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.createWarehouse(warehouse);
    }

    // Update a warehouse
    @PutMapping("/{id}")
    public Warehouse updateWarehouse(@PathVariable String id, @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse);
    }

    // Delete a warehouse
    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable String id) {
        warehouseService.deleteWarehouse(id);
    }
}
