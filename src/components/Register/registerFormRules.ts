import { t } from "@/utils/translateInFunction";
import { validationPatterns } from "@utils/validation";
import { FieldValues, UseFormGetValues } from "react-hook-form";

export const registerFormRules = (
  getValues: UseFormGetValues<FieldValues>
) => ({
  username: { required: t("register.errors.username") },
  email: {
    required: t("register.errors.email"),
    pattern: {
      value: validationPatterns.email,
      message: t("register.errors.emailInvalid"),
    },
  },
  password: {
    required: t("register.errors.password"),
    minLength: {
      value: 8,
      message: t("register.errors.passwordLength"),
    },
  },
  repeatPassword: {
    validate: (value: string) => {
      const password = getValues("password");
      if (!value) {
        return t("register.errors.password");
      }
      if (value !== password) {
        return t("register.errors.passwordMismatch");
      }
    },
  },
});
