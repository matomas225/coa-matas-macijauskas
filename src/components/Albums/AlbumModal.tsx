import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import "./AlbumModal.scss";
import {
  getIsAlbumModalOpen,
  setAlbumCreateModal,
  setIsAlbumModalOpen,
} from "./albumSlice";
import { AlbumsList } from "./AlbumsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../elements/Button";

export const AlbumModal = () => {
  const isModalOpen = useAppSelector(getIsAlbumModalOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsAlbumModalOpen(false));
  };

  const handleCreateAlbum = () => {
    dispatch(setAlbumCreateModal(true));
    dispatch(setIsAlbumModalOpen(false));
  };
  return (
    isModalOpen && (
      <div className="album-modal">
        <div className="album-modal-content">
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={handleClose}
          />
          <div className="header">
            <h1>Your Albums</h1>
            <Button
              className="create-album-button"
              type="button"
              onClick={handleCreateAlbum}
            >
              Create Album
            </Button>
          </div>
          <div className="album-list-scrollable">
            <AlbumsList />
          </div>
        </div>
      </div>
    )
  );
};
