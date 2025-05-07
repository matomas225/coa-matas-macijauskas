import React, { useState } from "react";
import "./Home.scss";
import { SongsList } from "@/components/SongsList/SongsList";
import { AudioPlayer } from "@/components/AudioPlayer/AudioPlayer";

const Home: React.FC = () => {
  const [homeSongs, setHomeSongs] = useState<(HTMLAudioElement | null)[]>([]);

  return (
    <>
      <SongsList songRefCallback={(songRefs) => setHomeSongs(songRefs)} />
      <AudioPlayer songRefs={homeSongs} />
    </>
  );
};

export default Home;
