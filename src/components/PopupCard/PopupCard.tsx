import React from "react";
import "./PopupCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePopupCard } from "./usePopupCard";
import { NavLink } from "react-router-dom";
import { routes } from "@/utils/routes";

export const PopupCard: React.FC = () => {
  const { displayPopup, onClose, onClick } = usePopupCard();
  return (
    displayPopup && (
      <div className="popup-overlay" data-testid="popup-overlay">
        <div className="popup-card">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={onClose}
            className="popup-close"
            data-testid="popup-close"
          />
          <div className="popup-text">
            Start listening with a free Soundify account
          </div>
          <p className="popup-subtext">
            Create an account or login if you have one.
          </p>
          <div className="popup-buttons">
            <NavLink
              to={routes.auth}
              onClick={() => onClick(true)}
              className="popup-login"
              data-testid="popup-login"
            >
              Login
            </NavLink>
            <NavLink
              to={routes.auth}
              onClick={() => onClick(false)}
              className="popup-register"
              data-testid="popup-register"
            >
              Register
            </NavLink>
          </div>
        </div>
      </div>
    )
  );
};
