import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // values.roles = values.roles.map((role) => role.trim());
      
      if (editingUser) {
        await axios.put(`http://localhost:8080/api/users/${editingUser.id}`, values);
      } else {
        await axios.post("http://localhost:8080/api/users", values);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      roles: record.roles || [],
    });
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      render: () => "******", // Ẩn mật khẩu
    },
    { title: "Full Name", dataIndex: "fullname", key: "fullname" },
    { title: "Address", dataIndex: "address", key: "address" },
    { 
      title: "Roles", 
      dataIndex: "roles", 
      key: "roles", 
      render: (roles) => roles.join(", ") 
    },
    { 
      title: "Created At", 
      dataIndex: "createdAt", 
      key: "createdAt", 
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm") 
    },
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
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={users} columns={columns} rowKey="id" />
      <Modal
        title="User Form"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          {!editingUser && (
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input className="p-2 border rounded-md w-full" type="password" />
            </Form.Item>
          )}
          <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: false }]}>
            <Input className="p-2 border rounded-md w-full" />
          </Form.Item>
          {/* <Form.Item name="roles" label="Roles" rules={[{ required: false }]}>
            <Select mode="multiple" className="w-full">
              <Option value="Admin">Admin</Option>
              <Option value="User">User</Option>
              <Option value="Manager">Manager</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
