import { apiPaths } from "@/services/api";
import store from "@/state/store";
import { t } from "@utils/translateInFunction";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { setToken, setUser } from "./sessionSlice";

export const loginUser = async (data: FieldValues) => {
  try {
    const response = await axios.post(apiPaths.loginUser, data);

    store.dispatch(setToken(response.data.token));
    store.dispatch(setUser(response.data.user));

    toast.success(t(response.data.message));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(t(error.response?.data.message));
    }
  }
};

export const isLoggedIn = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(apiPaths.isLogedIn, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return !!response.data.status;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return false;
    }
  }
};
