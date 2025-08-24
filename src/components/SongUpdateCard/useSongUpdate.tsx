import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setUpdatePopupOpen, getSelectedSongId, setRefetchSongs } from "./songUpdateSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { apiPaths } from "@/services/api";
import { getTokenState } from "../Login/sessionSlice";
import { useFormWithErrorHandling } from "@/hooks/useForm";
import { t } from "@/utils/translateInFunction";

type SongData = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  songPath: string;
  imagePath: string;
};

export const useSongUpdate = () => {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSong, setCurrentSong] = useState<SongData | null>(null);
  const dispatch = useAppDispatch();
  const token = useAppSelector(getTokenState);
  const selectedSongId = useAppSelector(getSelectedSongId);
  const { setValue } = useFormWithErrorHandling();

  useEffect(() => {
    const fetchSongData = async () => {
      dispatch(setRefetchSongs(false));
      if (!selectedSongId) return;

      try {
        const response = await axios.get(`${apiPaths.getSong}/${selectedSongId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const songData = response.data;
        setCurrentSong(songData);
        
        // Set form values
        setValue('title', songData.title);
        setValue('artist', songData.artist);
        setValue('album', songData.album || '');
      } catch (error) {
        console.error('Error fetching song data:', error);
        toast.error(t('song.errors.updateFailed'));
      }
    };

    fetchSongData();
  }, [selectedSongId, setValue, token]);

  const handleClose = () => {
    dispatch(setUpdatePopupOpen(false));
    setSongFile(null);
    setImageFile(null);
    setCurrentSong(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'song' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'song') {
      if (!file.type.startsWith('audio/')) {
        toast.error(t('song.errors.invalidAudioFile'));
        return;
      }
      setSongFile(file);
    } else {
      if (!file.type.startsWith('image/')) {
        toast.error(t('song.errors.invalidImageFile'));
        return;
      }
      setImageFile(file);
    }
  };

  const updateSong = async (formData: any) => {
    if (!selectedSongId) {
      toast.error(t('song.errors.noSongSelected'));
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('artist', formData.artist);
      formPayload.append('album', formData.album || '');
      
      if (songFile) {
        formPayload.append('songFile', songFile);
      }
      if (imageFile) {
        formPayload.append('imageFile', imageFile);
      }

      await axios.patch(`${apiPaths.updateSong}/${selectedSongId}`, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      toast.success(t('song.success.updated'));
      handleClose();
      dispatch(setRefetchSongs(true));
    } catch (error) {
      toast.error(t('song.errors.updateFailed'));
      console.error('Update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    songFile,
    imageFile,
    isLoading,
    handleClose,
    handleFileChange,
    updateSong,
    currentSong
  };
}; 