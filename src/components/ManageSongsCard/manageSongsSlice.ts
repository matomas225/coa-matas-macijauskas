import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

type ManageSongsState = {
  manageSongsPopupOpen: boolean;
};

const initialState: ManageSongsState = {
  manageSongsPopupOpen: false,
};

export const manageSongsSlice = createSlice({
  name: "manageSongs",
  initialState,
  reducers: {
    setManageSongsPopupOpen: (state, action) => {
      state.manageSongsPopupOpen = action.payload;
    },
  },
});

export const { setManageSongsPopupOpen } = manageSongsSlice.actions;

export const getIsManageSongsPopupOpen = (state: RootState) =>
  state.manageSongs.manageSongsPopupOpen;

export default manageSongsSlice.reducer;
