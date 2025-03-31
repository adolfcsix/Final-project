package com.btec.quanlykhohang_api.services;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.entities.Supplier;
import com.btec.quanlykhohang_api.repositories.ProductRepository;
import com.btec.quanlykhohang_api.repositories.SupplierRepository;
import com.btec.quanlykhohang_api.response.ProductDTO;
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

    @Autowired
    private SupplierRepository supplierRepository;

    // ✅ Lấy tất cả sản phẩm
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // ✅ Lấy sản phẩm theo ID
    public Optional<ProductDTO> getProductById(String id) {
        return productRepository.findById(id).map(this::convertToDTO);
    }

    // ✅ Tạo sản phẩm mới
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // ✅ Cập nhật sản phẩm
    public Product updateProduct(String id, Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setName(updatedProduct.getName());
                    product.setCategory(updatedProduct.getCategory());
                    product.setStockQuantity(updatedProduct.getStockQuantity());
                    product.setPrice(updatedProduct.getPrice());
                    product.setSupplierId(updatedProduct.getSupplierId());
                    product.setImageUrl(updatedProduct.getImageUrl());   // Thêm URL ảnh
                    product.setImageBase64(updatedProduct.getImageBase64()); // Thêm Base64 ảnh
                    return productRepository.save(product);
                }).orElse(null);
    }

    // ✅ Xóa sản phẩm
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // ✅ Upload ảnh cho sản phẩm
    public Product uploadImage(String productId, MultipartFile file, String imageUrl) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return null;

        try {
            // Nếu người dùng nhập URL ảnh
            if (imageUrl != null && !imageUrl.isEmpty()) {
                product.setImageUrl(imageUrl);
                product.setImageBase64(null);
            }
            // Nếu người dùng tải ảnh lên từ máy
            else if (file != null && !file.isEmpty()) {
                byte[] bytes = file.getBytes();
                String encodedImage = Base64.getEncoder().encodeToString(bytes);
                product.setImageBase64(encodedImage);
                product.setImageUrl(null);
            }

            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }

    // ✅ Chuyển đổi `Product` thành `ProductDTO`
    private ProductDTO convertToDTO(Product product) {
        String supplierName = supplierRepository.findById(product.getSupplierId())
                .map(Supplier::getName)
                .orElse("Unknown Supplier");

        return new ProductDTO(product, supplierName);
    }
}
