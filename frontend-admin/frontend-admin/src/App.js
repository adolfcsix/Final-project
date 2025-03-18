import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar";
import Chatbox from "./components/Chatbox"; // ✅ Import Chatbox

import './App.css';

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f4f6f9" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
        <Chatbox />  {/* ✅ Luôn hiển thị chatbox */}
      </div>
    </Router>
  );
};

export default App;
