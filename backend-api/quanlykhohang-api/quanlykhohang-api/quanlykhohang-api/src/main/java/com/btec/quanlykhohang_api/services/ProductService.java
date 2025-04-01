package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.entities.Supplier;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Lấy tất cả sản phẩm
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Lấy sản phẩm theo ID
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // Tạo sản phẩm mới
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Cập nhật sản phẩm
    public Product updateProduct(String id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setCategory(updatedProduct.getCategory());
                    product.setPrice(updatedProduct.getPrice());
                    product.setStockQuantity(updatedProduct.getStockQuantity());
                    product.setSupplierId(updatedProduct.getSupplierId());
                    product.setWarehouseId(updatedProduct.getWarehouseId());
                    return productRepository.save(product);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // Xóa sản phẩm
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
