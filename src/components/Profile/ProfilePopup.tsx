import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import "./ProfilePopup.scss";
import { closeProfilePopup, getProfilePopupState } from "./profilePopupSlice";
import React from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export const ProfilePopup: React.FC = () => {
  const displayPopup = useAppSelector(getProfilePopupState);
  const dispatch = useAppDispatch();

  const ref = useOnClickOutside(() => {
    dispatch(closeProfilePopup());
  });

  return (
    <>
      {displayPopup ? (
        <div ref={ref} className="profile-popup-wrapper">
          <ul>
            {/* Add Icons to Items When maping from item array TODO  */}
            {/* <FontAwesomeIcon className="icon" icon={faHouse} /> */}
            <li> Profile</li>
            <li>Settings</li>
            <li>Logout</li>
            <li>So on..</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};
