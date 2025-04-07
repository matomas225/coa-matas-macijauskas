import React, { ReactNode } from "react";
import "@styles/elements/elements.scss";

type ButtonProps = {
  children: ReactNode;
  type: "submit" | "reset" | "button";
};

export const Button: React.FC<ButtonProps> = ({ children, type }) => {
  return (
    <div className="button-container">
      <button type={type}>{children}</button>
    </div>
  );
};
