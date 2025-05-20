import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayPopupCard: false,
};

export const popupCardSlice = createSlice({
  name: "popupCardState",
  initialState,
  reducers: {
    setDisplayPopupCard: (state, action: { payload: boolean }) => {
      state.displayPopupCard = !state.displayPopupCard;
      if (action.payload) {
        state.displayPopupCard = action.payload;
      }
    },
  },
});

export const getDisplayPopupCard = (state: RootState) =>
  state.popupCardState.displayPopupCard;

export const { setDisplayPopupCard } = popupCardSlice.actions;

export default popupCardSlice.reducer;
