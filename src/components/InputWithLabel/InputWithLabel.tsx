import React, { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Label } from "@elements/Label";
import { Input } from "@elements/Input";

type InputWithLabelProps = {
  children: ReactNode;
  htmlFor: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  error?: string;
};

export const InputWithLabel: React.FC<InputWithLabelProps> = ({
  htmlFor,
  children,
  type,
  id,
  name,
  placeholder = "",
  required = false,
  register = undefined,
  rules = {},
  error = undefined,
}) => {
  return (
    <>
      <Label htmlFor={htmlFor}>{children}</Label>
      <Input
        error={error}
        rules={rules}
        register={register}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </>
  );
};
