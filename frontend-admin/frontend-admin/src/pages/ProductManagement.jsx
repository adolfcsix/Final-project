// src/components/ProductManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stockQuantity: '',
        supplierId: '',
        warehouseId: '',
        image: '',
    });

    // Fetch products, suppliers, and warehouses
    useEffect(() => {
        // Fetch products
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error('Error fetching products!', error));

        // Fetch suppliers
        axios.get('http://localhost:8080/api/suppliers')
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => console.error('Error fetching suppliers!', error));

        // Fetch warehouses
        axios.get('http://localhost:8080/api/warehouses')
            .then(response => {
                setWarehouses(response.data);
            })
            .catch(error => console.error('Error fetching warehouses!', error));
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission to add or update a product
    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = { ...formData };

        if (formData.id) {
            axios.put(`http://localhost:8080/api/products/${formData.id}`, productData)
                .then(response => {
                    alert('Product updated successfully!');
                    setProducts(products.map(product => (product.id === formData.id ? response.data : product)));
                    setFormData({
                        name: '',
                        category: '',
                        price: '',
                        stockQuantity: '',
                        supplierId: '',
                        warehouseId: '',
                        image: '',
                    });
                })
                .catch(error => console.error('Error updating product!', error));
        } else {
            axios.post('http://localhost:8080/api/products', productData)
                .then(response => {
                    alert('Product added successfully!');
                    setProducts([...products, response.data]);
                    setFormData({
                        name: '',
                        category: '',
                        price: '',
                        stockQuantity: '',
                        supplierId: '',
                        warehouseId: '',
                        image: '',
                    });
                })
                .catch(error => console.error('Error adding product!', error));
        }
    };

    // Handle editing a product
    const handleEdit = (product) => {
        setFormData(product);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Product Management</h1>

            {/* Form for adding and editing products */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="number"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleInputChange}
                        placeholder="Stock Quantity"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    
                    {/* Supplier Dropdown */}
                    <select
                        name="supplierId"
                        value={formData.supplierId}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>

                    {/* Warehouse Dropdown */}
                    <select
                        name="warehouseId"
                        value={formData.warehouseId}
                        onChange={handleInputChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Warehouse</option>
                        {warehouses.map(warehouse => (
                            <option key={warehouse.id} value={warehouse.id}>
                                {warehouse.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="Image URL"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                    {formData.id ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {/* Product List Table */}
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Stock Quantity</th>
                        <th className="p-3 text-left">Supplier</th>
                        <th className="p-3 text-left">Warehouse</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="border-t border-gray-200">
                            <td className="p-3">{product.name}</td>
                            <td className="p-3">{product.category}</td>
                            <td className="p-3">{product.price}</td>
                            <td className="p-3">{product.stockQuantity}</td>
                            <td className="p-3">{suppliers.find(supplier => supplier.id === product.supplierId)?.name}</td>
                            <td className="p-3">{warehouses.find(warehouse => warehouse.id === product.warehouseId)?.name}</td>
                            <td className="p-3">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManagement;
