import React from "react";
import "./Label.scss";

type LabelProps = {
  value: string;
  htmlFor: string;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, value }) => {
  return (
    <div className="label-container">
      <label htmlFor={htmlFor}>{value}</label>
    </div>
  );
};
