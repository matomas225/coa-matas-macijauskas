import React from "react";
import "./Login.scss";
import { Button } from "../Button/Button";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import { A } from "../A/A";

export const LoginForm: React.FC = () => {
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
        <A href="#" value="Don't have an account ?" />
        <A href="#" value="Forgot password ?" />
        <Button type="submit" value="Login" />
      </form>
    </div>
  );
};
