import React from "react";
import { useTranslation } from "react-i18next";
import { useFormWithErrorHandling } from "@/hooks/useForm";
import { registerFormRules } from "./registerFormRules";
import { createUser } from "./createUser";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { changeValue } from "@/pages/Auth/authSlice";
import { A } from "@elements/A";
import { Label } from "@elements/Label";
import { Input } from "@elements/Input";
import { Button } from "@elements/Button";

import "./Register.scss";

export const Register: React.FC = () => {
  const { register, handleSubmit, getValues, getErrorMessage, isSubmitting } =
    useFormWithErrorHandling();

  const formRules = registerFormRules(getValues);

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  return (
    <div className="form-register">
      <h1>{t("register.register")}</h1>
      <form onSubmit={handleSubmit(createUser)}>
        <Label htmlFor="username">{t("register.username")}</Label>
        <Input
          error={getErrorMessage("username")}
          rules={formRules.username}
          register={register}
          type="text"
          id="username"
          name="username"
          placeholder={t("register.placeholders.username")}
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
        />
        <Label htmlFor="repeat-password">{t("register.repeatPassword")}</Label>
        <Input
          error={getErrorMessage("repeatPassword")}
          rules={formRules.repeatPassword}
          register={register}
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          placeholder={t("register.placeholders.repeatPassword")}
        />
        <Button disabled={isSubmitting} type="submit">
          {t("register.register")}
        </Button>
        <A onClick={() => dispatch(changeValue(true))} href="#">
          {t("register.haveAccount")}
        </A>
      </form>
    </div>
  );
};
