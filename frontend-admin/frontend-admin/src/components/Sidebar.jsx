import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChartBar, FaUsers, FaCogs, FaBox, FaShoppingCart } from "react-icons/fa";

// Component SidebarItem
const SidebarItem = ({ to, icon, text, isOpen }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-2 p-3 rounded-md transition-all duration-200 ${
            isActive ? "bg-blue-500" : "hover:bg-gray-700"
          }`
        }
      >
        {icon}
        {isOpen && <span>{text}</span>}
      </NavLink>
    </li>
  );
};

// Component Sidebar
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "w-60" : "w-20"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-4 text-lg font-bold text-center border-b border-gray-700">
        {isOpen ? "Admin Panel" : "A"}
      </div>
      <ul className="space-y-2 mt-4">
        <SidebarItem to="/" icon={<FaChartBar />} text="Dashboard" isOpen={isOpen} />
        <SidebarItem to="/users" icon={<FaUsers />} text="Users" isOpen={isOpen} />
        <SidebarItem to="/orders" icon={<FaShoppingCart />} text="Orders" isOpen={isOpen} />
        <SidebarItem to="/products" icon={<FaBox />} text="Products" isOpen={isOpen} />
        <SidebarItem to="/settings" icon={<FaCogs />} text="Settings" isOpen={isOpen} />
      </ul>
    </div>
  );
};

export default Sidebar;
