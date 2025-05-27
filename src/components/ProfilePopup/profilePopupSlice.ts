import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  displayProfilePopup: boolean;
};

const initialState: InitialState = {
  displayProfilePopup: false,
};

export const profilePopupSlice = createSlice({
  name: "profilePopup",
  initialState,
  reducers: {
    setProfilePopup: (state) => {
      state.displayProfilePopup = !state.displayProfilePopup;
    },
    closeProfilePopup: (state) => {
      state.displayProfilePopup = false;
    },
  },
});

export const getProfilePopupState = (state: RootState) =>
  state.profilePopup.displayProfilePopup;

export const { setProfilePopup, closeProfilePopup } = profilePopupSlice.actions;

export default profilePopupSlice.reducer;
