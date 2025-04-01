import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Popconfirm } from "antd";
import axios from "axios";

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingWarehouse, setEditingWarehouse] = useState(null);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/warehouses");
      setWarehouses(response.data);
    } catch (error) {
      message.error("Failed to fetch warehouses: " + error.message);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingWarehouse) {
        await axios.put(`http://localhost:8080/api/warehouses/${editingWarehouse.id}`, values);
        message.success("Warehouse updated successfully");
      } else {
        await axios.post("http://localhost:8080/api/warehouses", values);
        message.success("Warehouse added successfully");
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingWarehouse(null);
      fetchWarehouses();
    } catch (error) {
      message.error("Error saving warehouse: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/warehouses/${id}`);
      message.success("Warehouse deleted successfully");
      fetchWarehouses();
    } catch (error) {
      message.error("Error deleting warehouse: " + error.message);
    }
  };

  const handleEdit = (record) => {
    setEditingWarehouse(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this warehouse?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Warehouse Management</h1>
        <Button type="primary" className="bg-green-500" onClick={() => setIsModalOpen(true)}>
          Add Warehouse
        </Button>
      </div>
      <Table
        dataSource={warehouses}
        columns={columns}
        rowKey="id"
        pagination={false}
        locale={{ emptyText: <div className="text-gray-500">No data</div> }}
      />
      <Modal title="Warehouse Form" open={isModalOpen} onOk={handleSave} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Warehouse Name" rules={[{ required: true, message: "Name is required" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: "Location is required" }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="capacity" label="Capacity" rules={[{ required: true, message: "Capacity is required" }]}> 
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Warehouse;
