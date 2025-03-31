package com.btec.quanlykhohang_api.controllers;

import com.btec.quanlykhohang_api.entities.Product;
import com.btec.quanlykhohang_api.response.ProductDTO;
import com.btec.quanlykhohang_api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*") // Cho phép frontend gọi API từ domain khác
public class ProductController {

    @Autowired
    private ProductService productService;

    // ✅ Lấy tất cả sản phẩm
    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // ✅ Lấy sản phẩm theo ID
    @GetMapping("/{id}")
    public Optional<ProductDTO> getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    // ✅ Tạo sản phẩm mới
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // ✅ Cập nhật sản phẩm
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // ✅ Xóa sản phẩm
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    // ✅ Upload ảnh cho sản phẩm (hỗ trợ file hoặc URL)
    @PostMapping("/{id}/uploadImage")
    public Product uploadProductImage(
            @PathVariable String id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "imageUrl", required = false) String imageUrl
    ) {
        return productService.uploadImage(id, file, imageUrl);
    }
}
