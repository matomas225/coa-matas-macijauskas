import React from "react";
import { ProfileMenu } from "@/components/ProfileMenu/ProfileMenu";
import { SongUploadCard } from "@/components/SongUploadCard/SongUploadCard";

export const Profile: React.FC = () => {
  return (
    <>
      <ProfileMenu />
      <SongUploadCard />
    </>
  );
};
