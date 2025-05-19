import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useFormWithErrorHandling } from "@/hooks/useForm";
import { loginFormRules } from "./loginFormRules";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel";
import { A } from "@elements/A";
import { Button } from "@elements/Button";

import "./Login.scss";
import { changeValue } from "@/pages/Auth/authSlice";
import { useLogin } from "@/hooks/useLogin";

export const Login: React.FC = () => {
  const { register, handleSubmit, getErrorMessage, isSubmitting } =
    useFormWithErrorHandling();
  const { loginUser } = useLogin();

  const formRules = loginFormRules();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <div className="form-container">
      <h1>{t("login.title")}</h1>
      <form onSubmit={handleSubmit(loginUser)}>
        <InputWithLabel
          htmlFor="username"
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          register={register}
          rules={formRules.username}
          error={getErrorMessage("username")}
        >
          {t("login.username")}
        </InputWithLabel>
        <InputWithLabel
          htmlFor="password"
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          register={register}
          rules={formRules.password}
          error={getErrorMessage("password")}
        >
          {t("login.password")}
        </InputWithLabel>
        <A href="#" onClick={() => dispatch(changeValue(false))}>
          {t("login.noAccount")}
        </A>
        <A href="#"> {t("login.forgotPassword")}</A>
        <Button disabled={isSubmitting} type="submit">
          {t("login.button")}
        </Button>
      </form>
    </div>
  );
};
