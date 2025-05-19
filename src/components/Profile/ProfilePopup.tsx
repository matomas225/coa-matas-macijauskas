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
import { logoutUser } from "@/components/Login/sessionSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type ProfilePopupProps = {
  ignoreRef?: React.RefObject<HTMLLIElement | null>;
};

export const ProfilePopup: React.FC<ProfilePopupProps> = ({ ignoreRef }) => {
  const displayPopup = useAppSelector(getProfilePopupState);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const ref = useOnClickOutside({
    callback: () => {
      dispatch(closeProfilePopup());
    },
    ignoreRef,
  });

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
      onClick: () => {
        dispatch(logoutUser());
        dispatch(closeProfilePopup());
        toast.success(t("login.logedOut"));
      },
    },
  ];

  return (
    <>
      {displayPopup ? (
        <div ref={ref} className="profile-popup-wrapper">
          <ul>
            {popupList.map((item, i) => {
              return (
                <PopupListItem
                  name={item.name}
                  icon={item.icon}
                  onClick={item?.onClick}
                  key={i}
                />
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};
