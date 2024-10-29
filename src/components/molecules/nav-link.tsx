import React from "react";
import Brand from "@/components/atoms/brand";
import Avatar from "@/components/atoms/avatar";

const NavLink = () => {
  return (
    <nav className="flex flex-row justify-between p-6 border border-gray-200 shadow-lg">
      {/* brand */}
      <Brand />
      {/* avatar */}
      <Avatar />
    </nav>
  );
};

export default NavLink;
