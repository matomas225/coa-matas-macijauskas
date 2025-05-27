import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/state/store";

type InitialState = {
  isUploadPopupOpen: boolean;
};

const initialState: InitialState = {
  isUploadPopupOpen: false,
};

export const songUploadSlice = createSlice({
  name: "songUpload",
  initialState,
  reducers: {
    setUploadPopupOpen: (state, action: { payload: boolean }) => {
      state.isUploadPopupOpen = action.payload;
    },
  },
});

export const { setUploadPopupOpen } = songUploadSlice.actions;

export const getIsUploadPopupOpen = (state: RootState) =>
  state.songUpload.isUploadPopupOpen;

export default songUploadSlice.reducer; 