import React from "react";

import { SongCard } from "./SongCard";

import "./SongList.scss";
import { useSongsList } from "./useSongsList";

export const SongsList: React.FC = () => {
  const { songs, handleOnClick, handlePlayPause } = useSongsList();
  return (
    <section className="songs-wrapper">
      <h1>Popular Songs</h1>
      <div className="songs">
        {songs &&
          songs.map((song) => (
            <SongCard
              key={song.id}
              image={song.imagePath}
              title={song.title}
              artist={song.artist}
              handleOnClick={() => handleOnClick(song.id)}
              playPause={handlePlayPause(song.id)}
            />
          ))}
      </div>
    </section>
  );
};
