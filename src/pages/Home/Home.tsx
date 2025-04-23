import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { apiPaths } from "@/services/api";

const Home: React.FC = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      const response = await axios.get(apiPaths.getSongs);

      setSongs(response.data);
    };
    getSongs();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      {songs.length === 0 ? (
        <p>Loading..</p>
      ) : (
        <div>
          {songs.map((songUrl, index) => (
            <div key={index}>
              <audio controls>
                <source src={songUrl} type="audio/mpeg" />
              </audio>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
