import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Editor" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  const [editingUser, setEditingUser] = useState(null);

  // Lọc danh sách người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Xóa người dùng
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // ✅ Thêm người dùng mới
  const addUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: "", email: "", role: "User" });
  };

  // ✅ Cập nhật người dùng
  const updateUser = () => {
    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      {/* Tìm kiếm */}
      <input
        type="text"
        placeholder="Search users..."
        className="border p-2 mb-4 w-full rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Form thêm/sửa người dùng */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mr-2 rounded"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mr-2 rounded"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
        <select
          className="border p-2 mr-2 rounded"
          value={editingUser ? editingUser.role : newUser.role}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, role: e.target.value })
              : setNewUser({ ...newUser, role: e.target.value })
          }
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
        </select>
        {editingUser ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={updateUser}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={addUser}
          >
            Add
          </button>
        )}
      </div>

      {/* Bảng hiển thị danh sách người dùng */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setEditingUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
