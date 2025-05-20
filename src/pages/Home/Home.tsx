import React from "react";
import "./Home.scss";
import { SongsList } from "@/components/SongsList/SongsList";
import { PopupCard } from "@/components/PopupCard/PopupCard";

const Home: React.FC = () => {
  return (
    <>
      <SongsList />
      <PopupCard />
    </>
  );
};

export default Home;
