import { Input } from "@render/elements/Input";
import { Label } from "@render/elements/Label";
import React, { ReactNode } from "react";

type InputWithLabelProps = {
  children: ReactNode;
  htmlFor: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
};

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  htmlFor,
  children,
  type,
  id,
  name,
  placeholder = "",
  required = false,
}) => {
  return (
    <>
      <Label htmlFor={htmlFor}>{children}</Label>
      <Input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};
