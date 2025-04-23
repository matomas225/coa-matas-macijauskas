import React from "react";
import NavItem from "./NavItem";
import { routes } from "@utils/routes";
import Logo from "@/assets/logo-white.svg";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserState, logoutUser } from "../Login/sessionSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

const Navigation: React.FC = () => {
  const user = useSelector(getUserState);
  const dispatch = useAppDispatch();

  const navigationItems = user
    ? [
        {
          route: routes.home,
          name: "Home",
        },
        {
          route: routes.home,
          name: user.username,
        },
        {
          route: routes.home,
          name: "Logout",
          onClick: () => dispatch(logoutUser()),
        },
      ]
    : [
        {
          route: routes.home,
          name: "Home",
        },
        {
          route: routes.auth,
          name: "Login",
        },
      ];
  return (
    <header>
      <nav>
        <NavLink to={routes.home}>
          <img src={Logo} alt="logo" />
        </NavLink>
        <ul>
          {navigationItems.map((item, i) => (
            <NavItem
              key={i + 1}
              route={item.route}
              name={item.name}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
