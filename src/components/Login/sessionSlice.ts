import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/state/store";
import { isTokenExpired } from "@/utils/isTokenExpired";

type User = {
  id: string;
  username: string;
  email: string;
};

type SessionType = {
  token: string | null;
  user: User | null;
};

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const tokenExpiration = token ? isTokenExpired(token) : true;

  if (tokenExpiration) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return {
    token: tokenExpiration ? null : token,
    user: user ? JSON.parse(user) : null,
  };
};

const initialState: SessionType = getInitialState();

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = null;
      state.user = null;
    },
  },
});

export const getUserState = (state: RootState) => state.session.user;
export const getTokenState = (state: RootState) => state.session.token;

export const { setUser, setToken, logoutUser } = sessionSlice.actions;

export default sessionSlice.reducer;
