import React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Navigation from "@/components/Navigation/Navigation";
import NotFound from "@/pages/NotFound/NotFound";
import Home from "@/pages/Home/Home";
import Auth from "@/pages/Auth/Auth";
import { routes } from "@utils/routes";
import { Profile } from "./pages/Profile/Profile";
import { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
import { useLogin } from "./hooks/useLogin";

const App: React.FC = () => {
  const { user } = useLogin();
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        {user ? (
          <>
            <Route path={routes.profile} element={<Profile />} />
            <Route path={routes.auth} element={<Navigate to={routes.home} />} />
          </>
        ) : (
          <>
            <Route path={routes.auth} element={<Auth />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AudioPlayer />
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
    </BrowserRouter>
  );
};

export default App;
