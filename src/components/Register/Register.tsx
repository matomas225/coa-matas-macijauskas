import React from "react";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";
import "./Register.scss";
import { Button } from "../Button/Button";

export const Register: React.FC = () => {
  return (
    <div className="form-register">
      <h1>Register</h1>
      <form>
        <Label htmlFor="username" value="Username" />
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter a username"
          required
        />
        <Label htmlFor="email" value="Email" />
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email example@email.com"
          required
        />
        <Label htmlFor="password" value="Password" />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter a password"
          required
        />
        <Label htmlFor="repeat-password" value="Repeat Password" />
        <Input
          type="password"
          id="repeat-password"
          name="repeat-password"
          placeholder="Repeat your password"
          required
        />
        <Button type="submit" value="Register" />
      </form>
    </div>
  );
};
