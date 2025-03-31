import React from "react";
import { Home, Package, ShoppingCart, Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    { name: "Inventory", icon: <Package size={20} />, path: "/inventory" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/orders" },
    { name: "Alerts", icon: <Bell size={20} />, path: "/alerts" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">
        Warehouse Manager
      </h2>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 
                ${
                  location.pathname === item.path
                    ? "bg-gray-700 text-white font-bold"
                    : "hover:bg-gray-700 hover:text-gray-200"
                }`}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="mt-auto flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold">
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
