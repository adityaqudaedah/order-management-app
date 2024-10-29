import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectInputProps {
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  register?: UseFormRegisterReturn;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  //   value: string;
  //   onChange: (value: string) => void;
}

const SelectInputForm: React.FC<SelectInputProps> = ({
  label,
  placeholder = "Select product name",
  options,
  register,
  required,
  error,
  errorMessage,
  //   value,
  //   onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          {...register}
          className={`block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
            error
              ? "focus:ring-red-500 focus:border-red-500"
              : "focus:ring-[#17A2DA] focus:border-[#17A2DA]"
          } sm:text-sm appearance-none`}
          //   value={value}
          //   onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SelectInputForm;
