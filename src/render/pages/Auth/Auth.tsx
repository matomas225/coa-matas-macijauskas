import { Login } from "@/render/components/Login/Login";
import { Register } from "@render/components/Register/Register";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { changeValue, getFormState } from "./authSlice";

const Auth: React.FC = () => {
  const formState = useAppSelector(getFormState);
  const dispatch = useAppDispatch();

  return (
    <article>
      {formState ? <Login /> : <Register />}
      <button onClick={() => dispatch(changeValue())}>Switch State Test</button>
    </article>
  );
};

export default Auth;
