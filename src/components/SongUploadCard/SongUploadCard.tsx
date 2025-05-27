import React from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel";
import { Button } from "../elements/Button";
import "./SongUploadCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { getIsUploadPopupOpen } from "./songUploadSlice";
import { useFormWithErrorHandling } from "@/hooks/useForm";
import { songUploadRules } from "./songUploadRules";
import { t } from "@/utils/translateInFunction";
import { useSongUpload } from "./useSongUpload";

export const SongUploadCard: React.FC = () => {
  const { isLoading, handleClose, handleFileChange, uploadSong } = useSongUpload();
  const { register, handleSubmit, getErrorMessage, getValues } = useFormWithErrorHandling();
  const isOpen = useAppSelector(getIsUploadPopupOpen);


  const onSubmit = () => {
    const formData = getValues();
    uploadSong(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="upload-popup-overlay">
      <div className="song-upload-card">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={handleClose}
          className="close-button"
        />
        <h2>{t('song.title.upload')}</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputWithLabel
            id="song-title"
            type="text"
            htmlFor="song-title"
            name="title"
            register={register}
            rules={songUploadRules.title}
            error={getErrorMessage('title')}
          >
            {t('song.fields.title')}
          </InputWithLabel>

          <InputWithLabel
            id="artist-name"
            type="text"
            htmlFor="artist-name"
            name="artist"
            register={register}
            rules={songUploadRules.artist}
            error={getErrorMessage('artist')}
          >
            {t('song.fields.artist')}
          </InputWithLabel>

          <InputWithLabel
            id="album-name"
            type="text"
            htmlFor="album-name"
            name="album"
            register={register}
            rules={songUploadRules.album}
            error={getErrorMessage('album')}
          >
            {t('song.fields.album')}
          </InputWithLabel>

          <div className="file-inputs">
            <InputWithLabel
              id="song-file"
              type="file"
              htmlFor="song-file"
              name="songFile"
              accept="audio/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'song')}
              required
            >
              {t('song.fields.songFile')}
            </InputWithLabel>

            <InputWithLabel
              id="cover-image"
              type="file"
              htmlFor="cover-image"
              name="imageFile"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, 'image')}
              required
            >
              {t('song.fields.coverImage')}
            </InputWithLabel>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('song.buttons.uploading') : t('song.buttons.upload')}
          </Button>
        </form>
      </div>
    </div>
  );
};
