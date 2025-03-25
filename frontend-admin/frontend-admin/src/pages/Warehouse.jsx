import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
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
      const response = await axios.get("http://localhost:8080/warehouses");
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingWarehouse) {
        await axios.put(`http://localhost:8080/warehouses/${editingWarehouse.id}`, values);
      } else {
        await axios.post("http://localhost:8080/warehouses", values);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingWarehouse(null);
      fetchWarehouses();
    } catch (error) {
      console.error("Error saving warehouse", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/warehouses/${id}`);
      fetchWarehouses();
    } catch (error) {
      console.error("Error deleting warehouse", error);
    }
  };

  const handleEdit = (record) => {
    setEditingWarehouse(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Capacity", dataIndex: "capacity", key: "capacity" },
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
        <h1 className="text-2xl font-bold">Warehouse Management</h1>
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add Warehouse
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={warehouses} columns={columns} rowKey="id" />
      <Modal title="Warehouse Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Warehouse;
