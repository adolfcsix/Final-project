import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select } from "antd";

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchProducts();
        fetchSuppliers();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchSuppliers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/suppliers");
        console.log("Suppliers data:", response.data);
        setSuppliers(response.data);
    } catch (error) {
        console.error("Error fetching suppliers:", error);
    }
};
    const handleAdd = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        form.setFieldsValue(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleSave = async (values) => {
        try {
            if (editingProduct) {
                await axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, values);
            } else {
                await axios.post("http://localhost:8080/api/products", values);
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
        { title: "Price", dataIndex: "price", key: "price" },
        { title: "Supplier", dataIndex: "supplierId", key: "supplierId", render: (id) => suppliers.find(s => s.id === id)?.name || "Unknown" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Product Management</h2>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>Add Product</Button>
            <Table dataSource={products} columns={columns} rowKey="id" />
            
            <Modal title={editingProduct ? "Edit Product" : "Add Product"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} onFinish={handleSave} layout="vertical">
                    <Form.Item name="name" label="Product Name" rules={[{ required: true, message: "Please enter product name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please enter category" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true, message: "Please enter quantity" }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter price" }]}>
                        <Input type="number" step="0.01" />
                    </Form.Item>
                    <Form.Item name="supplierId" label="Supplier" rules={[{ required: true, message: "Please select a supplier" }]}>
                        <Select>
                            {suppliers.map(supplier => (
                                <Select.Option key={supplier.id} value={supplier.id}>{supplier.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductManagement;
