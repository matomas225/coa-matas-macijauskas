import React, { useEffect, useRef, useState } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SongCard } from "./SongCard";
import { apiPaths } from "@/services/api";
import "./SongList.scss";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  getIsSongPlaying,
  getSongId,
  setIsSongPlaying,
  setSongId,
  setSongsList,
} from "./songSlice";

type Songs = {
  id: string;
  songPath: string;
  imagePath: string;
  title: string;
  artist: string;
};
type SongsListProps = {
  songRefCallback: (songRefs: (HTMLAudioElement | null)[]) => void;
};

export const SongsList: React.FC<SongsListProps> = ({ songRefCallback }) => {
  const [songs, setSongs] = useState<Songs[] | null>(null);

  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(getIsSongPlaying);
  const currentSongId = useAppSelector(getSongId);

  const songRefs = useRef<(HTMLAudioElement | null)[]>([]);

  useEffect(() => {
    if (songRefCallback && songRefs.current) {
      songRefCallback(songRefs.current);
    }
  }, [songRefCallback]);

  const handleOnClick = (songId: string, songRef: HTMLAudioElement | null) => {
    if (songRef) {
      if (songId !== currentSongId) {
        const currentSongRef = songRefs.current.find(
          (ref) => ref?.id === currentSongId
        );
        currentSongRef?.pause();

        songRef.currentTime = 0;
        songRef.play();
        dispatch(setIsSongPlaying(true));
        dispatch(setSongId(songId));
      } else {
        if (isPlaying) {
          songRef.pause();
          dispatch(setIsSongPlaying(false));
        } else {
          songRef.play();
          dispatch(setIsSongPlaying(true));
        }
      }
    }
  };

  const handlePlayPause = (songId: string) => {
    if (songId === currentSongId && isPlaying) {
      return faCirclePause;
    } else {
      return faCirclePlay;
    }
  };

  useEffect(() => {
    const getSongs = async () => {
      const results = await axios.get(apiPaths.getSongs);
      if (results.data) {
        setSongs(results.data);
        dispatch(setSongsList(results.data));
      }
    };

    getSongs();
  }, [dispatch]);

  return (
    <section className="songs-wrapper">
      <h1>Popular Songs</h1>
      <div className="songs">
        {songs &&
          songs.map((song, i) => (
            <SongCard
              key={song.id}
              song={song.songPath}
              image={song.imagePath}
              title={song.title}
              artist={song.artist}
              songId={song.id}
              audioRef={(element) => {
                songRefs.current[i] = element;
              }}
              handleOnClick={() => handleOnClick(song.id, songRefs.current[i])}
              playPause={handlePlayPause(song.id)}
            />
          ))}
      </div>
    </section>
  );
};
