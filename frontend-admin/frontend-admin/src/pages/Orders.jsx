import React, { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Alice", total: "$200", status: "Pending" },
    { id: 2, customer: "Bob", total: "$350", status: "Shipped" },
    { id: 3, customer: "Charlie", total: "$120", status: "Delivered" },
  ]);

  const [newOrder, setNewOrder] = useState({ customer: "", total: "", status: "Pending" });
  const [editingOrder, setEditingOrder] = useState(null);

  const addOrder = () => {
    if (!newOrder.customer || !newOrder.total) return;
    setOrders([...orders, { id: orders.length + 1, ...newOrder }]);
    setNewOrder({ customer: "", total: "", status: "Pending" });
  };

  const updateOrder = () => {
    setOrders(orders.map((order) => (order.id === editingOrder.id ? editingOrder : order)));
    setEditingOrder(null);
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>

      {/* Form thêm/sửa đơn hàng */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="border p-2 mr-2 rounded"
          value={editingOrder ? editingOrder.customer : newOrder.customer}
          onChange={(e) =>
            editingOrder
              ? setEditingOrder({ ...editingOrder, customer: e.target.value })
              : setNewOrder({ ...newOrder, customer: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Total"
          className="border p-2 mr-2 rounded"
          value={editingOrder ? editingOrder.total : newOrder.total}
          onChange={(e) =>
            editingOrder
              ? setEditingOrder({ ...editingOrder, total: e.target.value })
              : setNewOrder({ ...newOrder, total: e.target.value })
          }
        />
        <select
          className="border p-2 mr-2 rounded"
          value={editingOrder ? editingOrder.status : newOrder.status}
          onChange={(e) =>
            editingOrder
              ? setEditingOrder({ ...editingOrder, status: e.target.value })
              : setNewOrder({ ...newOrder, status: e.target.value })
          }
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        {editingOrder ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateOrder}>
            Update
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={addOrder}>
            Add
          </button>
        )}
      </div>

      {/* Bảng đơn hàng */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customer}</td>
              <td className="border p-2">{order.total}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditingOrder(order)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
