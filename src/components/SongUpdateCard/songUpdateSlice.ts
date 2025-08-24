import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

type SongUpdateState = {
  updatePopupOpen: boolean;
  selectedSongId: string | null;
  refetchSongs: boolean;
};

const initialState: SongUpdateState = {
  updatePopupOpen: false,
  selectedSongId: null,
  refetchSongs: false,
};

export const songUpdateSlice = createSlice({
  name: "songUpdate",
  initialState,
  reducers: {
    setUpdatePopupOpen: (state, action) => {
      state.updatePopupOpen = action.payload;
    },
    setSelectedSongId: (state, action) => {
      state.selectedSongId = action.payload;
    },
    setRefetchSongs: (state, action) => {
      state.refetchSongs = action.payload;
    },
  },
});

export const { setUpdatePopupOpen, setSelectedSongId, setRefetchSongs } = songUpdateSlice.actions;

export const getIsUpdatePopupOpen = (state: RootState) =>
  state.songUpdate.updatePopupOpen;

export const getSelectedSongId = (state: RootState) =>
  state.songUpdate.selectedSongId;

export const getRefetchSongs = (state: RootState) =>
  state.songUpdate.refetchSongs;

export default songUpdateSlice.reducer; 