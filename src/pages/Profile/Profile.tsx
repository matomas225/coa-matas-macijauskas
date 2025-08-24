import React from "react";
import { ProfileMenu } from "@/components/ProfileMenu/ProfileMenu";
import { SongUploadCard } from "@/components/SongUploadCard/SongUploadCard";
import { ManageSongsCard } from "@/components/ManageSongsCard/ManageSongsCard";
import { AlbumModal } from "@/components/Albums/AlbumModal";
import { AlbumCreateCard } from "@/components/Albums/AlbumCreateCard";

export const Profile: React.FC = () => {
  return (
    <>
      <ProfileMenu />
      <SongUploadCard />
      <ManageSongsCard />
      <AlbumModal />
      <AlbumCreateCard />
    </>
  );
};
