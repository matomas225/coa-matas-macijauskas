import React, { ReactNode } from "react";
import "./elements.scss";

type ButtonProps = {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled = false,
}) => {
  return (
    <div className="button-container">
      <button disabled={disabled} type={type}>
        {children}
      </button>
    </div>
  );
};
