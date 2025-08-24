import { apiPaths } from "@/services/api";
import { getTokenState } from "../Login/sessionSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { setManageSongsPopupOpen } from "./manageSongsSlice";

const useManageSongsCard = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const token = useAppSelector(getTokenState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get(apiPaths.getUserSongs, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      setSongs(data); 
    };
    fetchSongs();
  }, [token]);

  const handleDeleteSong = async (songId: string) => {
    try {
      const response =  await axios.delete(`${apiPaths.deleteSong}/${songId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      setSongs(songs.filter((song) => song.id !== data.id));
      dispatch(setManageSongsPopupOpen(false));
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  const refetch = async () => {
      const response = await axios.get(apiPaths.getUserSongs, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = response.data;
      setSongs(data); 
    };

  return { songs, handleDeleteSong, refetch, setSongs };
};

export default useManageSongsCard;