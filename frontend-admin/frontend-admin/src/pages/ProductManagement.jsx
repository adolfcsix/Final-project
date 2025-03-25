import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, values);
      } else {
        await axios.post("http://localhost:8080/api/products", values);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Supplier ID", dataIndex: "supplierId", key: "supplierId" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button className="bg-blue-500 text-white" onClick={() => handleEdit(record)}>Edit</Button>
          <Button className="bg-red-500 text-white" onClick={() => handleDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add Product
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={products} columns={columns} rowKey="id" />
      <Modal title="Product Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
<Form.Item name="name" label="Name" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" /> </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" /> </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" type="number" /> </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" type="number" /> </Form.Item>
          <Form.Item name="supplierId" label="Supplier ID" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;