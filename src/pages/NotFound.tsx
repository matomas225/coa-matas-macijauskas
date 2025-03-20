import React from "react";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>Page not found!!!</h1>
      <NavLink to="/">Return Home</NavLink>
    </div>
  );
};

export default NotFound;
