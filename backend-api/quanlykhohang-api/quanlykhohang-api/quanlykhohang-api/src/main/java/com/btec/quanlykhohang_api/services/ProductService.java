package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // Create a new product
    public Product createProduct(Product product) {
        product.setCreatedDate(LocalDateTime.now()); // Set created date
        return productRepository.save(product);
    }

    // Update product
    public Product updateProduct(String id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setCategory(updatedProduct.getCategory());
            product.setQuantity(updatedProduct.getQuantity());
            product.setPrice(updatedProduct.getPrice());
            product.setSupplierId(updatedProduct.getSupplierId());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    // Delete product
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}