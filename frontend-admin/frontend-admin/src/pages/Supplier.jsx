import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingSupplier) {
        await axios.put(`http://localhost:8080/api/suppliers/${editingSupplier.id}`, values);
      } else {
        await axios.post("http://localhost:8080/api/suppliers", values);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingSupplier(null);
      fetchSuppliers();
    } catch (error) {
      console.error("Error saving supplier", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/suppliers/${id}`);
      fetchSuppliers();
    } catch (error) {
      console.error("Error deleting supplier", error);
    }
  };

  const handleEdit = (record) => {
    setEditingSupplier(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Contact", dataIndex: "contact", key: "contact" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
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
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add Supplier
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={suppliers} columns={columns} rowKey="id" />
      <Modal title="Supplier Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          <Form.Item name="contact" label="Contact" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Supplier;
