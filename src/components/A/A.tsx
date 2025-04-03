import React from "react";
import "./A.scss";

type AProps = {
  href: string;
  value: string;
  onClick?: () => void;
};

export const A: React.FC<AProps> = ({ href, value, onClick = () => null }) => {
  return (
    <div className="a-container">
      <a onClick={onClick} href={href}>
        {value}
      </a>
    </div>
  );
};
