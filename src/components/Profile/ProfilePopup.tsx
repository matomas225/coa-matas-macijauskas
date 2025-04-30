import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import "./ProfilePopup.scss";
import { closeProfilePopup, getProfilePopupState } from "./profilePopupSlice";
import React from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  faGear,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { PopupListItem } from "./PopupListItem";

type ProfilePopupProps = {
  ignoreRef?: React.RefObject<HTMLLIElement | null>;
};

const popupList = [
  {
    name: "Profile",
    icon: faUser,
  },
  {
    name: "Settings",
    icon: faGear,
  },
  {
    name: "Logout",
    icon: faArrowRightFromBracket,
  },
];

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
            {popupList.map((item, i) => {
              return (
                <PopupListItem name={item.name} icon={item.icon} key={i} />
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};
