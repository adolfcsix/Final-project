package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Supplier;
import com.btec.quanlykhohang_api.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    // Get all suppliers
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    // Get supplier by ID
    public Optional<Supplier> getSupplierById(String id) {
        return supplierRepository.findById(id);
    }

    // Create a new supplier
    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    // Update a supplier
    public Supplier updateSupplier(String id, Supplier updatedSupplier) {
        return supplierRepository.findById(id).map(supplier -> {
            supplier.setName(updatedSupplier.getName());
            supplier.setCategory(updatedSupplier.getCategory());
            supplier.setContact(updatedSupplier.getContact());
            supplier.setAddress(updatedSupplier.getAddress());
            return supplierRepository.save(supplier);
        }).orElseThrow(() -> new RuntimeException("Supplier not found with id " + id));
    }

    // Delete supplier
    public void deleteSupplier(String id) {
        supplierRepository.deleteById(id);
    }
}
