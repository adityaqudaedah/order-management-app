import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Select from "react-tailwindcss-select";
import { SelectProps } from "react-tailwindcss-select/dist/components/type";

const SelectInput: React.FC<
  {
    label: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    register? : UseFormRegisterReturn
  } & SelectProps
> = (props) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {props.label}
        {props.required && <span className="text-red-500">*</span>}
      </label>
      <Select {...props}/>
      {props.error && <p className="mt-2 text-sm text-red-600">{props.errorMessage}</p>}
    </div>
  );
};

export default SelectInput;
