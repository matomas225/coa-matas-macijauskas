import React from "react";
import "./A.scss";

type AProps = {
  href: string;
  value: string;
};

export const A: React.FC<AProps> = ({ href, value }) => {
  return (
    <div className="a-container">
      <a href={href}>{value}</a>
    </div>
  );
};
