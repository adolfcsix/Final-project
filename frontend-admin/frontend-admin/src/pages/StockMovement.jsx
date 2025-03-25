import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const StockMovement = () => {
  const [stockMovements, setStockMovements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingMovement, setEditingMovement] = useState(null);

  useEffect(() => {
    fetchStockMovements();
  }, []);

  const fetchStockMovements = async () => {
    try {
      const response = await axios.get("http://localhost:8080/stock-movements");
      setStockMovements(response.data);
    } catch (error) {
      console.error("Error fetching stock movements", error);
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.date = values.date.format("YYYY-MM-DD");
      if (editingMovement) {
        await axios.put(`http://localhost:8080/stock-movements/${editingMovement.id}`, values);
      } else {
        await axios.post("http://localhost:8080/stock-movements", values);
      }
      setIsModalOpen(false);
      form.resetFields();
      setEditingMovement(null);
      fetchStockMovements();
    } catch (error) {
      console.error("Error saving stock movement", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/stock-movements/${id}`);
      fetchStockMovements();
    } catch (error) {
      console.error("Error deleting stock movement", error);
    }
  };

  const handleEdit = (record) => {
    setEditingMovement(record);
    form.setFieldsValue({ ...record, date: moment(record.date) });
    setIsModalOpen(true);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Product ID", dataIndex: "productId", key: "productId" },
    { title: "Warehouse ID", dataIndex: "warehouseId", key: "warehouseId" },
    { title: "Movement Type", dataIndex: "movementType", key: "movementType" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Date", dataIndex: "date", key: "date" },
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
        <h1 className="text-2xl font-bold">Stock Movement Management</h1>
        <Button className="bg-green-500 text-white" onClick={() => setIsModalOpen(true)}>
          Add Stock Movement
        </Button>
      </div>
      <Table className="bg-white p-4 shadow-md rounded-lg" dataSource={stockMovements} columns={columns} rowKey="id" />
      <Modal title="Stock Movement Form" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="warehouseId" label="Warehouse ID" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="movementType" label="Movement Type" rules={[{ required: true }]}> 
            <Select> <Option value="IN">IN</Option> <Option value="OUT">OUT</Option> </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}> <Input type="number" /> </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}> <DatePicker className="w-full" /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StockMovement;