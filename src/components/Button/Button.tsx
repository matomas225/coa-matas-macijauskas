import React from "react";
import "./Button.scss";

type ButtonProps = {
  value: string;
  type: "submit" | "reset" | "button";
};

export const Button: React.FC<ButtonProps> = ({ value, type }) => {
  return (
    <div className="button-container">
      <button type={type}>{value}</button>
    </div>
  );
};
