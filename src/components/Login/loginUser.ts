import { apiPaths } from "@/services/api";
import { t } from "@utils/translateInFunction";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const loginUser = async (data: FieldValues) => {
  try {
    const response = await axios.post(apiPaths.loginUser, data);

    localStorage.setItem("token", response.data.token);
    toast.success(t(response.data.message));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(t(error.response?.data.message));
    }
  }
};

export const isLogedIn = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(apiPaths.isLogedIn, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
