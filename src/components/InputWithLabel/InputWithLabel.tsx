import React, { ReactNode, ChangeEvent } from "react";
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
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
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
  value,
  onChange,
  accept,
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
        value={value}
        onChange={onChange}
        accept={accept}
      />
    </>
  );
};
