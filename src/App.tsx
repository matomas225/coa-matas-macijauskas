import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Navigation from "@/components/Navigation/Navigation";
import NotFound from "@/pages/NotFound/NotFound";
import Home from "@/pages/Home/Home";
import Auth from "@/pages/Auth/Auth";
import { routes } from "@utils/routes";
import { getUserState, logoutUser } from "./components/Login/sessionSlice";
import { Profile } from "./pages/Profile/Profile";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { isLoggedIn } from "@/components/Login/loginUser";

const App: React.FC = () => {
  const user = useAppSelector(getUserState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkLogin = async () => {
      const logedIn = await isLoggedIn();
      if (!logedIn) {
        dispatch(logoutUser());
      }
    };

    checkLogin();
    // eslint-disable-next-line
  }, []);

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
