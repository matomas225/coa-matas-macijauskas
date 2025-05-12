import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getIsSongPlaying,
  getSongId,
  getSongsList,
  setIsSongPlaying,
  setSongId,
} from "@/components/SongsList/songSlice";
import { faCirclePause, faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export const useCurrentSong = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(getIsSongPlaying);
  const songsList = useAppSelector(getSongsList) ?? [];
  const currentSongId = useAppSelector(getSongId);

  const currentSongIndex = songsList.findIndex(
    (song) => song?.id === currentSongId
  );
  const currentSongData =
    currentSongIndex >= 0 ? songsList[currentSongIndex] : null;

  const handlePreviousSong = () => {
    const previousSong = songsList[currentSongIndex - 1];
    if (previousSong) {
      dispatch(setSongId(previousSong.id));
      dispatch(setIsSongPlaying(true));
    }
  };

  const handlePlayPause = () => dispatch(setIsSongPlaying(!isPlaying));

  const handleNextSong = () => {
    const nextSong = songsList[currentSongIndex + 1];
    if (nextSong) {
      dispatch(setSongId(nextSong.id));
      dispatch(setIsSongPlaying(true));
    }
  };

  const songIcon = () => (isPlaying ? faCirclePause : faCirclePlay);

  return {
    isPlaying,
    currentSongData,
    songsList,
    currentSongId,
    handlePreviousSong,
    handlePlayPause,
    handleNextSong,
    songIcon,
  };
};
