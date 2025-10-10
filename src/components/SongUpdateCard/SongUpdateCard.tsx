import React, { useEffect } from 'react'
import { InputWithLabel } from '../InputWithLabel/InputWithLabel'
import { Button } from '../elements/Button'
import './SongUpdateCard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { getIsUpdatePopupOpen } from './songUpdateSlice'
import { useFormWithErrorHandling } from '@/hooks/useForm'
import { songUploadRules } from '../SongUploadCard/songUploadRules'
import { t } from '@/utils/translateInFunction'
import { useSongUpdate } from './useSongUpdate'
import { setAlbums } from '../Albums/albumSlice'
import axios from 'axios'
import { apiPaths } from '@/services/api'

export const SongUpdateCard: React.FC = () => {
  const { isLoading, handleClose, handleFileChange, updateSong, currentSong } =
    useSongUpdate()
  const { register, handleSubmit, getErrorMessage, getValues } =
    useFormWithErrorHandling()
  const isOpen = useAppSelector(getIsUpdatePopupOpen)

  const dispatch = useAppDispatch()

  const onSubmit = () => {
    const formData = getValues()

    if (formData.album !== '') {
      const addSongToAlbum = async () => {
        try {
          const response = await axios.post(
            apiPaths.addSongToAlbum,
            {
              albumId: formData.album,
              songId: currentSong?.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          )
          console.log(response.data)
        } catch (error) {
          console.error(error)
        }
      }
      addSongToAlbum()
    }

    updateSong(formData)
  }

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await axios.get(apiPaths.getAlbums, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(setAlbums(res.data))
    }
    fetchAlbums()
  }, [dispatch])

  if (!isOpen) return null

  return (
    <div className="update-popup-overlay">
      <div className="song-update-card">
        <FontAwesomeIcon
          icon={faXmark}
          onClick={handleClose}
          className="close-button"
        />
        <h2>{t('song.title.update')}</h2>
        {currentSong && (
          <div className="current-song-info">
            <div className="image-preview">
              <img
                src={currentSong.imagePath}
                alt={`${currentSong.title} cover`}
              />
            </div>
            <div className="current-files">
              <p>
                <strong>{t('song.fields.title')}:</strong> {currentSong.title}
              </p>
              <p>
                <strong>{t('song.fields.artist')}:</strong> {currentSong.artist}
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputWithLabel
            id="song-title"
            type="text"
            htmlFor="song-title"
            name="title"
            register={register}
            rules={songUploadRules.title}
            error={getErrorMessage('title')}
            defaultValue={currentSong?.title}
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
            defaultValue={currentSong?.artist}
          >
            {t('song.fields.artist')}
          </InputWithLabel>
          <div className="file-inputs">
            <InputWithLabel
              id="song-file"
              type="file"
              htmlFor="song-file"
              name="songFile"
              accept="audio/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(e, 'song')
              }
            >
              {t('song.fields.songFile')} (Optional)
            </InputWithLabel>

            <InputWithLabel
              id="cover-image"
              type="file"
              htmlFor="cover-image"
              name="imageFile"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFileChange(e, 'image')
              }
            >
              {t('song.fields.coverImage')} (Optional)
            </InputWithLabel>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? t('song.buttons.updating') : t('song.buttons.update')}
          </Button>
        </form>
      </div>
    </div>
  )
}
