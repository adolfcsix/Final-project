package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.entities.Supplier;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import com.btec.quanlykhohang_api.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Optional<Supplier> getSupplierById(String id) {
        return supplierRepository.findById(id);
    }

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(String id, Supplier updatedSupplier) {
        return supplierRepository.findById(id)
                .map(supplier -> {
                    supplier.setName(updatedSupplier.getName());
                    supplier.setAddress(updatedSupplier.getAddress());
                    supplier.setContactNumber(updatedSupplier.getContactNumber());
                    return supplierRepository.save(supplier);
                }).orElse(null);
    }

    public void deleteSupplier(String id) {
        supplierRepository.deleteById(id);
    }
}
