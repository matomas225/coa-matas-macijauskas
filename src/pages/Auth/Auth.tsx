import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { getFormState } from "./authSlice";
import { Login } from "@/components/Login/Login";
import { Register } from "@/components/Register/Register";

const Auth: React.FC = () => {
  const formState = useAppSelector(getFormState);

  return <article>{formState ? <Login /> : <Register />}</article>;
};

export default Auth;
