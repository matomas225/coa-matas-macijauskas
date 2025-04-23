import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Navigation from "@/components/Navigation/Navigation";
import NotFound from "@/pages/NotFound/NotFound";
import Home from "@/pages/Home/Home";
import Auth from "@/pages/Auth/Auth";
import { routes } from "@utils/routes";
import axios from "axios";
import { apiPaths } from "./services/api";
import { useSelector } from "react-redux";
import { getUserState } from "./components/Login/sessionSlice";

const App: React.FC = () => {
  const [songs, setSongs] = useState([]);
  const user = useSelector(getUserState);

  useEffect(() => {
    const getSongs = async () => {
      const response = await axios.get(apiPaths.getSongs);

      setSongs(response.data);
    };
    getSongs();
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route
          path={routes.auth}
          element={user ? <Navigate to={routes.home} /> : <Auth />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
      <>
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
    </BrowserRouter>
  );
};

export default App;
