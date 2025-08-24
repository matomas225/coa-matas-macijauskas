import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getUserState } from "@/components/Login/sessionSlice";
import "./ProfileMenu.scss";
import { Button } from "../elements/Button";
import { setUploadPopupOpen } from "@/components/SongUploadCard/songUploadSlice";
import { setManageSongsPopupOpen } from "@/components/ManageSongsCard/manageSongsSlice";
import { setIsAlbumModalOpen } from "../Albums/albumSlice";

export const ProfileMenu: React.FC = () => {
  const user = useAppSelector(getUserState);
  const dispatch = useAppDispatch();

  const handleUploadClick = () => {
    dispatch(setUploadPopupOpen(true));
  };

  const handleManageSongsClick = () => {
    dispatch(setManageSongsPopupOpen(true));
  };

  const handleManageAlbumsClick = () => {
    dispatch(setIsAlbumModalOpen(true));
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
      <Button type="button" onClick={handleManageSongsClick}>
        Manage Songs
      </Button>
      <Button type="button" onClick={handleManageAlbumsClick}>
        Manage Albums
      </Button>
    </section>
  );
};
