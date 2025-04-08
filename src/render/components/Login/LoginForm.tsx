import React from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { changeValue } from "@/render/pages/Auth/authSlice";
import { Button } from "@render/elements/Button";
import { A } from "@render/elements/A";
import { InputWithLabel } from "@render/components/InputWithLabel/InputWithLabel";
import "@styles/components/Login/Login.scss";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form>
        <InputWithLabel
          htmlFor="username"
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        >
          Username
        </InputWithLabel>
        <InputWithLabel
          htmlFor="password"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        >
          Password
        </InputWithLabel>
        <A href="#" onClick={() => dispatch(changeValue(false))}>
          Don't have an account ?
        </A>
        <A href="#"> Forgot password ?</A>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
