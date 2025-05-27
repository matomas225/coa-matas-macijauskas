import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setUploadPopupOpen } from "@/components/SongUploadCard/songUploadSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { apiPaths } from "@/services/api";
import { t } from "@/utils/translateInFunction";

export const useSongUpload = () => {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setUploadPopupOpen(false));
    setSongFile(null);
    setImageFile(null);
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

  const uploadSong = async (formData: any) => {
    if (!songFile) {
      toast.error(t('song.errors.songFileRequired'));
      return;
    }

    if (!imageFile) {
      toast.error(t('song.errors.imageFileRequired'));
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('artist', formData.artist);
      formPayload.append('album', formData.album || '');
      formPayload.append('songFile', songFile);
      formPayload.append('imageFile', imageFile);

      await axios.post(apiPaths.uploadSong, formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(t('song.success.uploaded'));
      handleClose();
    } catch (error) {
      toast.error(t('song.errors.uploadFailed'));
      console.error('Upload error:', error);
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
    uploadSong
  };
}; 