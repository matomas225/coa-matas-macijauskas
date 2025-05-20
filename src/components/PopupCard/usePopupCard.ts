import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { changeValue } from "@/pages/Auth/authSlice";
import { getDisplayPopupCard, setDisplayPopupCard } from "./popupCardSlice";

export const usePopupCard = () => {
  const displayPopup = useAppSelector(getDisplayPopupCard);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setDisplayPopupCard(false));
  };

  const onClick = (value: boolean) => {
    dispatch(changeValue(value));
    dispatch(setDisplayPopupCard(false));
  };

  return { displayPopup, onClose, onClick };
};
