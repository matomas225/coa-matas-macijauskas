import React, { useEffect, useRef, useState } from "react";

import "./SongList.scss";
import { SongCard } from "./SongCard";
import axios from "axios";
import { apiPaths } from "@/services/api";

export const SongsList: React.FC = () => {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    const getSongs = async () => {
      const results = await axios.get(apiPaths.getSongs);
      if (results.data) {
        setSongs(results.data);
      }
    };

    getSongs();
  }, []);

  return (
    <section className="songs-wrapper">
      <h1>Popular Songs</h1>
      <div className="songs">
        {songs
          ? songs.map((song) => {
              return (
                <SongCard
                  key={song.id}
                  song={song.songPath}
                  image={song.imagePath}
                  title={song.title}
                  artist={song.artist}
                  songId={song.id}
                />
              );
            })
          : null}
      </div>
    </section>
  );
};
