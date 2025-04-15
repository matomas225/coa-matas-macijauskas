import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token: string) => {
  const decoded = jwtDecode(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime > decoded.exp;
};
