import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaChartBar, FaUsers, FaCogs, FaBox,
  FaShoppingCart, FaBars, FaWarehouse, FaExchangeAlt, FaTruck, 
} from "react-icons/fa";

const SidebarItem = ({ to, icon, text, isOpen }) => (
  <li className="relative group">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
          isActive ? "bg-blue-600 text-white shadow-lg" : "hover:bg-gray-700 text-gray-300"
        } justify-${isOpen ? "start" : "center"}`
      }
    >
      {icon}
      {isOpen && <span className="transition-opacity duration-200">{text}</span>}
    </NavLink>
  </li>
);

const Sidebar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith("/login"); // ✅ Chỉ kiểm tra "/login"
  const [isOpen, setIsOpen] = useState(true);

  if (isLoginPage) return null; // ✅ Ẩn Sidebar khi ở trang Login

  return (
    <div className={`h-screen bg-gray-900 text-white flex flex-col justify-between transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <span className="font-bold text-xl">{isOpen ? "Admin Panel" : "A"}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-xl hover:text-gray-400 transition">
          <FaBars />
        </button>
      </div>
      <ul className="space-y-3 mt-4 flex-1">
        <SidebarItem to="/dashboard" icon={<FaChartBar />} text="Dashboard" isOpen={isOpen} />
        <SidebarItem to="/users" icon={<FaUsers />} text="Users" isOpen={isOpen} />
        <SidebarItem to="/orders" icon={<FaShoppingCart />} text="Orders" isOpen={isOpen} />
        <SidebarItem to="/products" icon={<FaBox />} text="Products" isOpen={isOpen} />
        <SidebarItem to="/warehouse" icon={<FaWarehouse />} text="Warehouse" isOpen={isOpen} />
        <SidebarItem to="/stockmovement" icon={<FaExchangeAlt />} text="Stock Movement" isOpen={isOpen} />
        <SidebarItem to="/supplier" icon={<FaTruck />} text="Supplier" isOpen={isOpen} />
      </ul>
      <div className="border-t border-gray-700 p-3">
        <SidebarItem to="/settings" icon={<FaCogs />} text="Settings" isOpen={isOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
