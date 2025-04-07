import React from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { changeValue } from "@/render/pages/Auth/authSlice";
import { Button } from "@render/elements/Button";
import { Label } from "@render/elements/Label";
import { Input } from "@render/elements/Input";
import { A } from "@render/elements/A";
import "@styles/components/Login/Login.scss";

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <A href="#" onClick={() => dispatch(changeValue(false))}>
          Don't have an account ?
        </A>
        <A href="#"> Forgot password ?</A>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
