import React from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import "./elements.scss";

type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues> | undefined;
  rules?: RegisterOptions;
  error?: string;
};

export const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder = "",
  required = false,
  register = () => undefined,
  rules = {},
  error = undefined,
}) => {
  return (
    <div className="input-container">
      <input
        className={error && "input-error"}
        {...register(name, { ...rules })}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};
