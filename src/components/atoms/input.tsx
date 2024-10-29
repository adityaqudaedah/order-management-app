import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  label: string;
  error?: boolean;
  errorMessage?: string;
  register? : UseFormRegisterReturn
}
const Input: React.FC<IInput & InputHTMLAttributes<HTMLInputElement>> = ({
  label,
  error = false,
  errorMessage = "",
  required = false,
  register,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        {...rest}
        {...register}
        className={`mt-1 block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-1 ${
          error
            ? "focus:ring-red-500 focus:border-red-500"
            : "focus:ring-[#17A2DA] focus:border-[#17A2DA]"
        } sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />

      {error && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default Input;
