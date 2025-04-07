import React from "react";
import "@styles/elements/elements.scss";

type InputProps = {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
};

export const Input: React.FC<InputProps> = ({
  type,
  id,
  name,
  placeholder = "",
  required = false,
}) => {
  return (
    <div className="input-container">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
