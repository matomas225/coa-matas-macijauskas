import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiPaths } from "@/services/api";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setAlbums } from "../Albums/albumSlice";

type ManageSongsItemProps = {
  song: any;
  handleEdit: (id: string) => void;
  handleDeleteSong: (id: string) => void;
};

export const ManageSongsItem = ({
  song,
  handleEdit,
  handleDeleteSong,
}: ManageSongsItemProps) => {
  const dispatch = useAppDispatch();
  const addSongToAlbum = async (albumId: string, songId: string) => {
    await axios.post(
      apiPaths.addSongToAlbum,
      { albumId, songId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    // Refetch albums
    const albumsRes = await axios.get(apiPaths.getAlbums, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(setAlbums(albumsRes.data));
  };
  return (
    <div className="song-card">
      <div className="image-wrapper">
        <img src={song.imagePath} alt={`${song.title} cover`} />
      </div>
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
      <div className="actions">
        <button className="edit" onClick={() => handleEdit(song.id)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="delete" onClick={() => handleDeleteSong(song.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
