import React, { useRef } from "react";
import NavItem from "./NavItem";
import { routes } from "@utils/routes";
import Logo from "@/assets/logo-white.svg";
import "./Navigation.scss";
import { NavLink } from "react-router-dom";
import { getUserState } from "../Login/sessionSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { ProfilePopup } from "../Profile/ProfilePopup";
import { setProfilePopup } from "../Profile/profilePopupSlice";

const Navigation: React.FC = () => {
  const user = useAppSelector(getUserState);

  const ref = useRef<HTMLLIElement>(null);

  const dispatch = useAppDispatch();

  const navigationItems = user
    ? [
        {
          route: routes.home,
          name: "Home",
        },
        {
          route: "#",
          name: user.username,
          containerRef: ref,
          onClick: () => dispatch(setProfilePopup()),
          element: <ProfilePopup ignoreRef={ref} />,
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
              element={item.element}
              containerRef={item.containerRef}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
