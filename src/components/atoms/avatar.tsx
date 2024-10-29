import React from "react";

const Avatar = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
        CR
      </div>

      <span className="text-black font-semibold">Cooper Rosser</span>

      <svg
        className="w-4 h-4 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
};

export default Avatar;
