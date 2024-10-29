"use client";
import { BUTTON_TYPE } from "@/lib/const";
import React from "react";

interface IButton {
  label: string;
  buttontype: keyof typeof BUTTON_TYPE;
  bg : string
}
const Button: React.FC<
  IButton & React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { textColor,border} = BUTTON_TYPE[props.buttontype];

  return (
    <span>
      <button className={`${props.bg} ${textColor} ${border} font-bold py-2 px-6 rounded`} {...props}>
        {props.label}
      </button>
    </span>
  );
};

export default Button;
