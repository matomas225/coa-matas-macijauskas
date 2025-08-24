import React, { ReactNode } from "react";
import "./elements.scss";

type ButtonProps = {
  children: ReactNode;
  type: "submit" | "reset" | "button";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  disabled = false,
  className,
  onClick,
}) => {
  return (
    <div className="button-container">
      <button
        className={className}
        disabled={disabled}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
