import React from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import "@styles/elements/elements.scss";

type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
};

export const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder = "",
  required = false,
  register = () => undefined,
  rules = {},
}) => {
  return (
    <div className="input-container">
      <input
        {...register(name, { ...rules })}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
