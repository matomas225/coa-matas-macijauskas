import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Navigation from "@/components/Navigation/Navigation";
import NotFound from "@/pages/NotFound/NotFound";
import Home from "@/pages/Home/Home";
import Auth from "@/pages/Auth/Auth";
import { routes } from "@utils/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.auth} element={<Auth />} />
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
