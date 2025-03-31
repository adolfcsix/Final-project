package com.btec.quanlykhohang_api.response;

import com.btec.quanlykhohang_api.entities.Product;

public class ProductDTO {
    private String id;
    private String name;
    private String category;
    private int stockQuantity;
    private double price;
    private String supplierId;
    private String supplierName;
    private String imageUrl;
    private String imageBase64;

    public ProductDTO(Product product, String supplierName) {
        this.id = product.getId();
        this.name = product.getName();
        this.category = product.getCategory();
        this.stockQuantity = product.getStockQuantity();
        this.price = product.getPrice();
        this.supplierId = product.getSupplierId();
        this.supplierName = supplierName;
        this.imageUrl = product.getImageUrl();
        this.imageBase64 = product.getImageBase64();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(int stockQuantity) { this.stockQuantity = stockQuantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getSupplierId() { return supplierId; }
    public void setSupplierId(String supplierId) { this.supplierId = supplierId; }
    public String getSupplierName() { return supplierName; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }
}
