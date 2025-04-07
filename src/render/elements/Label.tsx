import React, { ReactNode } from "react";
import "@styles/elements/elements.scss";

type LabelProps = {
  children: ReactNode;
  htmlFor: string;
};

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <div className="label-container">
      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
};
