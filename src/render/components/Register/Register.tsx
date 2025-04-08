import React from "react";
import { Label } from "../../elements/Label";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";
import "@styles/components/Register/Register.scss";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { validationPatterns } from "@/utils/validation";
//TODO: make validation rules cleaner maybe think of a way to move them out of the component and just import them
//TODO: add translations to locales
export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { t } = useTranslation();
  console.log(errors);
  return (
    <div className="form-register">
      <h1>{t("test")}</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Label htmlFor="username">Username</Label>
        <Input
          rules={{ required: "Username is required" }}
          register={register}
          type="text"
          id="username"
          name="username"
          placeholder="Enter a username"
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          rules={{
            required: "Email is required",
            pattern: {
              value: validationPatterns.email,
              message: "Please enter a valid email",
            },
          }}
          register={register}
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email: example@gmail.com"
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
          }}
          register={register}
          type="password"
          id="password"
          name="password"
          placeholder="Enter a password"
          required
        />
        <Label htmlFor="repeat-password">Repeat Password</Label>
        <Input
          rules={{
            validate: (value) => {
              const password = getValues("password");
              if (!value) {
                return "Repeat password is required";
              }
              if (value !== password) {
                return "Passwords doesn't match.";
              }
            },
          }}
          register={register}
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
