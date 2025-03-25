import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Warehouse from "./pages/Warehouse";
import Sidebar from "./components/Sidebar";
import Chatbox from "./components/Chatbox"; // ✅ Import Chatbox
import Login from "./pages/Login";
import StockMovement from "./pages/StockMovement";
import Supplier from "./pages/Supplier";
import ProductManagement from "./pages/ProductManagement";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Đặt Login là trang mặc định */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Chỉ hiển thị Sidebar & Chatbox sau khi đăng nhập */}
        <Route
          path="/*"
          element={
            <div style={{ display: "flex", height: "100vh" }}>
              <Sidebar />
              <div style={{ flex: 1, padding: "20px", backgroundColor: "#f4f6f9" }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route path="/warehouse" element={<Warehouse />} />
                  <Route path="/stockmovement" element={<StockMovement />} />
                  <Route path="/supplier" element={<Supplier />} />
                </Routes>
              </div>
              <Chatbox /> {/* ✅ Luôn hiển thị chatbox */}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
