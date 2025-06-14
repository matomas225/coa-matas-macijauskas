import React, { ChangeEvent } from "react";
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
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
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
  value,
  onChange,
  accept,
}) => {
  const inputProps = register ? register(name, { ...rules }) : {};

  return (
    <div className="input-container">
      <input
        className={error ? "input-error" : ""}
        {...inputProps}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        accept={accept}
      />
      {error && <div className="error-container">{error}</div>}
    </div>
  );
};
