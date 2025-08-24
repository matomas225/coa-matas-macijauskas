import React, { useState } from "react";
import axios from "axios";
import { apiPaths } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getAlbumCreateModal,
  setAlbumCreateModal,
  setAlbums,
} from "./albumSlice";
import "./AlbumCreateCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export const AlbumCreateCard: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const isOpen = useAppSelector(getAlbumCreateModal);
  const dispatch = useAppDispatch();

  const resetFrom = () => {
    setTitle("");
    setArtist("");
    setCoverImage(null);
  };

  const handleClose = () => {
    resetFrom();
    dispatch(setAlbumCreateModal(false));
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      const response = await axios.post(apiPaths.createAlbum, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        resetFrom();
        return toast.error(error.response?.data.errors[0].msg);
      }
    }
    // Refetch albums after create
    const albumsRes = await axios.get(apiPaths.getAlbums, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(setAlbums(albumsRes.data));
    handleClose();
  };

  return (
    isOpen && (
      <div className="album-create-modal">
        <div className="album-create-card">
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={handleClose}
          />
          <h2>Create Album</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Album Title"
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
          />
          <button onClick={handleCreate}>Create Album</button>
        </div>
      </div>
    )
  );
};
