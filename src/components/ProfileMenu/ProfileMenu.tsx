import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getUserState } from "@/components/Login/sessionSlice";
import "./ProfileMenu.scss";
import { Button } from "../elements/Button";
import { setUploadPopupOpen } from "../SongUploadCard/songUploadSlice";

export const ProfileMenu: React.FC = () => {
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  const handleUploadClick = () => {
    dispatch(setUploadPopupOpen(true));
  };

  return (
    <section className="profile-menu">
      <h1>Profile</h1>
      <div className="profile-menu-item">
        <p>Username:</p>
        <p>{user && user.username}</p>
      </div>
      <div className="profile-menu-item">
        <p>Email:</p>
        <p>{user && user.email}</p>
      </div>
      <Button type="button" onClick={handleUploadClick}>
        Upload Song
      </Button>
    </section>
  );
};
