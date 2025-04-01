import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Table, Button, Modal, Form, Input, Select, Upload, Radio, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [uploadMethod, setUploadMethod] = useState("upload");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productRes, supplierRes, warehouseRes] = await Promise.all([
        axios.get("http://localhost:8080/api/products"),
        axios.get("http://localhost:8080/api/suppliers"),
        axios.get("http://localhost:8080/api/warehouses"),
      ]);
      setProducts(productRes.data);
      setSuppliers(supplierRes.data);
      setWarehouses(warehouseRes.data);
    } catch (error) {
      message.error("Error fetching data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("Form values before sending:", values);

      const formattedValues = {
        ...values,
        stockquantity: parseInt(values.stockquantity, 10),
        price: parseFloat(values.price),
      };

      console.log("Formatted values before sending:", formattedValues);

      await axios.post("http://localhost:8080/api/products", formattedValues);
      message.success("Product added successfully!");
      fetchData();
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.errorFields) {
        message.error("Please correct the highlighted fields.");
      } else {
        message.error("Error adding product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting product", error);
      message.error("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      ...record,
      quantity: Number(record.quantity),
      price: Number(record.price),
    });
    setIsModalOpen(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "StockQuantity", dataIndex: "stockQuantity", key: "stockQuantity" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Supplier", dataIndex: "supplierName", key: "supplierName" },
    { title: "Warehouse", dataIndex: "warehouseName", key: "warehouseName" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Image", dataIndex: "image", key: "image", render: (text) => text ? <img src={text} alt="Product" width={50} /> : "No Image" },
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="mb-4 flex justify-between">
        <Input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <Button className="bg-green-500 text-white" onClick={() => { setIsModalOpen(true); form.resetFields(); }}>Add Product</Button>
      </div>
      {loading ? (
        <Spin size="large" tip="Loading..." />
      ) : (
        <Table
          className="bg-white p-4 shadow-md rounded-lg"
          dataSource={products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))}
          columns={columns}
          rowKey="id"
        />
      )}
    
      <Modal title="Product Form" open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)} confirmLoading={loading}>
        <Form form={form} layout="vertical" initialValues={{ name: '', category: '', quantity: '', price: '' }}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the product name" }]}> <Input /> </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please enter a category" }]}> <Input /> </Form.Item>
          <Form.Item name="stockQuantity" label="StockQuantity" rules={[{ required: true, message: "Please enter a valid stockquantity" }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true, message: "Please enter a valid price" }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="supplierId" label="Supplier" rules={[{ required: true, message: "Please select a supplier" }]}>
            <Select placeholder="Select Supplier">
              {suppliers.map(s => <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="warehouseId" label="Warehouse" rules={[{ required: true, message: "Please select a warehouse" }]}>
            <Select placeholder="Select Warehouse">
              {warehouses.map(w => <Select.Option key={w.id} value={w.id}>{w.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="Image Upload Method">
            <Radio.Group value={uploadMethod} onChange={(e) => setUploadMethod(e.target.value)}>
              <Radio value="upload">Upload File</Radio>
              <Radio value="url">Image URL</Radio>
            </Radio.Group>
          </Form.Item>
          {uploadMethod === "upload" ? (
            <Form.Item name="image" label="Product Image">
              <Upload beforeUpload={() => false} listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          ) : (
            <Form.Item name="image" label="Image URL" rules={[{ type: "url", message: "Enter a valid URL" }]}>
              <Input placeholder="Enter Image URL" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
}
