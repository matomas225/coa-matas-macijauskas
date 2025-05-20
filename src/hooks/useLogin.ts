import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import axios from "axios";
import { apiPaths } from "@/services/api";
import {
  getUserState,
  setToken,
  setUser,
} from "@/components/Login/sessionSlice";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { logoutUser } from "@/components/Login/sessionSlice";
import { resetSongState } from "@/components/SongsList/songSlice";

export const useLogin = () => {
  const user = useAppSelector(getUserState);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const loginUser = async (data: FieldValues) => {
    try {
      const response = await axios.post(apiPaths.loginUser, data);

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      toast.success(t(response.data.message));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(t(error.response?.data.message));
      }
    }
  };

  const isLoggedIn = async () => {
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

  useEffect(() => {
    const checkLogin = async () => {
      const logedIn = await isLoggedIn();
      if (!logedIn) {
        dispatch(logoutUser());
        dispatch(resetSongState());
      }
    };

    checkLogin();
  }, [dispatch]);

  return {
    user,
    loginUser,
    isLoggedIn,
  };
};
