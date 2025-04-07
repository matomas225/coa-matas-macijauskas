import React from "react";
import { Label } from "../../elements/Label";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";
import "@styles/components/Register/Register.scss";

export const Register: React.FC = () => {
  return (
    <div className="form-register">
      <h1>Register</h1>
      <form>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter a username"
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email: example@gmail.com"
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter a password"
          required
        />
        <Label htmlFor="repeat-password">Repeat Password</Label>
        <Input
          type="password"
          id="repeat-password"
          name="repeat-password"
          placeholder="Repeat your password"
          required
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};
