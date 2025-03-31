import React from "react";

import { Bell, } from "lucide-react";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
      {/* Tiêu đề trang */}
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

      {/* Khu vực thông báo & hồ sơ người dùng */}
      <div className="flex items-center gap-6">
        {/* Icon Thông báo */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
            3
          </span>
        </button>

        {/* Hồ sơ người dùng */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all duration-300">
          <img
            src="https://i.pravatar.cc/40" 
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <span className="font-medium text-gray-800">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
