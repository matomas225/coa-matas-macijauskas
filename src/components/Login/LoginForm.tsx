import React from "react";
import "./Login.scss";
import { Button } from "../Button/Button";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { A } from "../A/A";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { changeValue } from "@/pages/Auth/authSlice";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form>
        <Label htmlFor="username" value="Username" />
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        />
        <Label htmlFor="password" value="Password" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <A
          href="#"
          onClick={() => dispatch(changeValue(false))}
          value="Don't have an account ?"
        />
        <A href="#" value="Forgot password ?" />
        <Button type="submit" value="Login" />
      </form>
    </div>
  );
};
