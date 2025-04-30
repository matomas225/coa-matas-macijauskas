import React from "react";

import "./SongList.scss";
import { SongCard } from "./SongCard";

export const SongsList: React.FC = () => {
  return (
    <section className="songs-wrapper">
      <h1>Popular Songs</h1>
      <div className="songs">
        <SongCard />
        <SongCard />
        <SongCard />
      </div>
    </section>
  );
};
