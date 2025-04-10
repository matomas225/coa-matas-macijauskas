import { changeValue } from "@/render/pages/Auth/authSlice";
import { apiPaths } from "@/services/api";
import store from "@/state/store";
import { t } from "@utils/translateInFunction";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export const createUser = async (data: FieldValues) => {
  try {
    const response = await axios.post(apiPaths.postUser, data);

    toast.success(t(response.data.message));

    store.dispatch(changeValue(true));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(t(error.response?.data.message));
    }
  }
};
