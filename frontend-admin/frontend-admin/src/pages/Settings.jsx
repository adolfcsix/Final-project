import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook điều hướng

  // Chuyển đổi giao diện Dark/Light
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Cập nhật cài đặt mật khẩu
  const updatePassword = () => {
    alert(`Password updated to: ${password}`);
  };

  // Đăng xuất và chuyển hướng về trang Login
  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Xóa token đăng nhập (nếu có)
    navigate("/login"); // Chuyển hướng đến trang Login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        {/* Chuyển đổi giao diện Dark/Light */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">🌍 Appearance</h2>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>

        {/* Cài đặt thông báo */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">📩 Notifications</h2>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span>Enable Notifications</span>
          </label>
        </div>

        {/* Đổi mật khẩu */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">🔐 Change Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter new password"
          />
          <button
            onClick={updatePassword}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-full"
          >
            Update Password
          </button>
        </div>

        {/* Đăng xuất */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center justify-center"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
