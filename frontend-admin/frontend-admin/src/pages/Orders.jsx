import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

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
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate", render: (text) => new Date(text).toLocaleString() },
    { title: "Status", dataIndex: "status", key: "status" },
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
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add Order
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={orders} columns={columns} rowKey="id" />
      <Modal title="Order Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="userId" label="User ID" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" /> </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}> <Input className="p-2 border rounded-md w-full" /> </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}> 
            <Select>
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="Shipped">Shipped</Select.Option>
              <Select.Option value="Delivered">Delivered</Select.Option>
              <Select.Option value="Cancelled">Cancelled</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Order;