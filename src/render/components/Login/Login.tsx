import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { changeValue } from "@/render/pages/Auth/authSlice";
import { Button } from "@render/elements/Button";
import { A } from "@render/elements/A";
import { InputWithLabel } from "@render/components/InputWithLabel/InputWithLabel";
import "@styles/components/Login/Login.scss";
import { useFormWithErrorHandling } from "@/hooks/useForm";
import { useTranslation } from "react-i18next";
import { loginFormRules } from "./loginFormRules";
import { isLogedIn, loginUser } from "./loginUser";

export const Login: React.FC = () => {
  const { register, handleSubmit, getErrorMessage, isSubmitting } =
    useFormWithErrorHandling();

  const formRules = loginFormRules();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  //check if use is loged in
  useEffect(() => {
    isLogedIn();
  }, []);

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
