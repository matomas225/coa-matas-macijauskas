import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  getIsManageSongsPopupOpen,
  setManageSongsPopupOpen,
} from "./manageSongsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useManageSongsCard from "./useManageSongsCard";
import { ManageSongsItem } from "./ManageSongsItem";
import { SongUpdateCard } from "../SongUpdateCard/SongUpdateCard";
import {
  setUpdatePopupOpen,
  setSelectedSongId,
} from "../SongUpdateCard/songUpdateSlice";
import "./ManageSongsCard.scss";

export const ManageSongsCard = () => {
  const dispatch = useAppDispatch();
  const isManageSongsPopupOpen = useAppSelector(getIsManageSongsPopupOpen);
  const { songs, handleDeleteSong } = useManageSongsCard();

  const handleClose = () => {
    dispatch(setManageSongsPopupOpen(false));
  };

  const handleEdit = (songId: string) => {
    dispatch(setSelectedSongId(songId));
    dispatch(setUpdatePopupOpen(true));
  };

  if (!isManageSongsPopupOpen) return null;

  return (
    <>
      <div className="manage-popup-overlay">
        <div className="manage-songs-card">
          <div className="header">
            <h1>Manage Songs</h1>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={handleClose}
              className="close-button"
            />
          </div>
          <div className="songs-grid">
            {songs?.map((song) => (
              <ManageSongsItem
                key={song.id}
                song={song}
                handleEdit={handleEdit}
                handleDeleteSong={handleDeleteSong}
              />
            ))}
          </div>
        </div>
      </div>
      <SongUpdateCard />
    </>
  );
};
