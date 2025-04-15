import { t } from "@/utils/translateInFunction";

export const loginFormRules = () => ({
  username: { required: t("login.errors.username") },
  password: { required: t("login.errors.password") },
});
