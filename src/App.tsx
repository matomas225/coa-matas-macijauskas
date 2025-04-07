import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./render/pages/Home/Home";
import NotFound from "./render/pages/NotFound/NotFound";
import Navigation from "@/render/components/Navigation/Navigation";
import { routes } from "./utils/routes";
import Auth from "./render/pages/Auth/Auth";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.auth} element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
