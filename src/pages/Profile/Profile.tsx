import { getUserState } from "@/components/Login/sessionSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";

export const Profile: React.FC = () => {
  const user = useAppSelector(getUserState);
  return (
    <section>
      <h1>Hi, {user && user.username}</h1>
    </section>
  );
};
