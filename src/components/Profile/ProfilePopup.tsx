import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import "./ProfilePopup.scss";
import { closeProfilePopup, getProfilePopupState } from "./profilePopupSlice";
import React from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

type ProfilePopupProps = {
  ignoreRef?: React.RefObject<HTMLLIElement | null>;
};

export const ProfilePopup: React.FC<ProfilePopupProps> = ({ ignoreRef }) => {
  const displayPopup = useAppSelector(getProfilePopupState);
  const dispatch = useAppDispatch();

  const ref = useOnClickOutside({
    callback: () => {
      dispatch(closeProfilePopup());
    },
    ignoreRef,
  });

  return (
    <>
      {displayPopup ? (
        <div ref={ref} className="profile-popup-wrapper">
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} /> Profile
            </li>
            <li>
              <FontAwesomeIcon icon={faGear} />
              Settings
            </li>
            <li>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              Logout
            </li>
            <li>So on..</li>
          </ul>
        </div>
      ) : null}
    </>
  );
};
