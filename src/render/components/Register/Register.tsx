import React from "react";
import { Label } from "../../elements/Label";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";
import { useTranslation } from "react-i18next";
import { useFormWithErrorHandling } from "@/hooks/useForm";
import { registerFormRules } from "./registerFormRules";
import "@styles/components/Register/Register.scss";

export const Register: React.FC = () => {
  const { register, handleSubmit, getValues, getErrorMessage } =
    useFormWithErrorHandling();

  const formRules = registerFormRules(getValues);

  const { t } = useTranslation();

  return (
    <div className="form-register">
      <h1>{t("register.register")}</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <Label htmlFor="username">{t("register.username")}</Label>
        <Input
          error={getErrorMessage("username")}
          rules={formRules.username}
          register={register}
          type="text"
          id="username"
          name="username"
          placeholder={t("register.placeholders.username")}
          required
        />
        <Label htmlFor="email">{t("register.email")}</Label>
        <Input
          error={getErrorMessage("email")}
          rules={formRules.email}
          register={register}
          type="email"
          id="email"
          name="email"
          placeholder={t("register.placeholders.email")}
          required
        />
        <Label htmlFor="password">{t("register.password")}</Label>
        <Input
          rules={formRules.password}
          error={getErrorMessage("password")}
          register={register}
          type="password"
          id="password"
          name="password"
          placeholder={t("register.placeholders.password")}
          required
        />
        <Label htmlFor="repeat-password">{t("register.repeatPassword")}</Label>
        <Input
          error={getErrorMessage("repeat-password")}
          rules={formRules.repeatPassword}
          register={register}
          type="password"
          id="repeat-password"
          name="repeat-password"
          placeholder={t("register.placeholders.repeatPassword")}
          required
        />
        <Button type="submit">{t("register.register")}</Button>
      </form>
    </div>
  );
};
