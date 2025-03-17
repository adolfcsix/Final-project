package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Supplier;
import com.btec.quanlykhohang_api.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    // Get all suppliers
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    // Get supplier by ID
    @GetMapping("/{id}")
    public Optional<Supplier> getSupplierById(@PathVariable String id) {
        return supplierService.getSupplierById(id);
    }

    // Create a new supplier
    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierService.createSupplier(supplier);
    }

    // Update a supplier
    @PutMapping("/{id}")
    public Supplier updateSupplier(@PathVariable String id, @RequestBody Supplier supplier) {
        return supplierService.updateSupplier(id, supplier);
    }

    // Delete a supplier
    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable String id) {
        supplierService.deleteSupplier(id);
    }
}
