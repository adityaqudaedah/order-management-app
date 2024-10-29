import React from "react";
import { FiBriefcase, FiMessageCircle } from "react-icons/fi";

const SideBar = () => {
  return (
    <aside className="bg-[#052a49] min-h-screen flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        <div className="flex items-center space-x-2 text-white">
          <FiBriefcase />
          {/* Icon */}
          <span>Order Management</span>
        </div>
      </div>

      {/* Empty Space in the middle */}
      <div className="flex-grow"></div>

      {/* Bottom Section */}
      <div className="border-t border-gray-600 pt-4">
        <div className="text-gray-300">
          <p className="flex items-center space-x-2">
            <FiMessageCircle />
            {/* Support Icon */}
            <span>Support</span>
          </p>
          <p className="text-xs mt-2">cs@bsnet.com</p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
