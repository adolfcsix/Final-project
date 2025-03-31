import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, InputNumber } from "antd";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchSuppliers();
    fetchWarehouses();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses", error);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.orderedBy.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingOrder) {
        await axios.put(`http://localhost:8080/api/orders/${editingOrder.id}`, values);
      } else {
        await axios.post("http://localhost:8080/api/orders", values);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingOrder(null);
      fetchOrders();
    } catch (error) {
      console.error("Error saving order", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order", error);
    }
  };

  const handleEdit = (record) => {
    setEditingOrder(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Order Type", dataIndex: "orderType", key: "orderType" },
    { title: "Product", dataIndex: "productId", key: "productId", render: (id) => products.find(p => p.id === id)?.name || "Unknown" },
    { title: "Supplier", dataIndex: "supplierId", key: "supplierId", render: (id) => suppliers.find(s => s.id === id)?.name || "Unknown" },
    { title: "Warehouse", dataIndex: "warehouseId", key: "warehouseId", render: (id) => warehouses.find(w => w.id === id)?.name || "Unknown" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Total Price", dataIndex: "totalPrice", key: "totalPrice", render: (price) => `$${price.toFixed(2)}` },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Ordered By", dataIndex: "orderedBy", key: "orderedBy" },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate", render: (text) => new Date(text).toLocaleString() },
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
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Input 
          placeholder="Search by Ordered By" 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)} 
          className="p-2 border rounded-md w-1/3"
        />
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add Order
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={filteredOrders} columns={columns} rowKey="id" />
      <Modal title="Order Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="orderType" label="Order Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="purchase">Purchase</Select.Option>
              <Select.Option value="sale">Sale</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="productId" label="Product" rules={[{ required: true }]}>
            <Select>
              {products.map(product => (
                <Select.Option key={product.id} value={product.id}>{product.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="supplierId" label="Supplier" rules={[{ required: true }]}>
            <Select>
              {suppliers.map(supplier => (
                <Select.Option key={supplier.id} value={supplier.id}>{supplier.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="warehouseId" label="Warehouse" rules={[{ required: true }]}>
            <Select>
              {warehouses.map(warehouse => (
                <Select.Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <InputNumber min={1} className="p-2 border rounded-md w-full" />
          </Form.Item>

          <Form.Item name="totalPrice" label="Total Price" rules={[{ required: true }]}>
            <InputNumber min={0} className="p-2 border rounded-md w-full" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
              <Select.Option value="Canceled">Canceled</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="orderedBy" label="Ordered By" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;
