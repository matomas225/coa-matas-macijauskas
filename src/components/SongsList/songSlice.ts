import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

type SongsList = {
  artist: string;
  id: string;
  imagePath: string;
  songPath: string;
  title: string;
};

type InitialState = {
  isPlaying: boolean;
  songId: null | string;
  songsList: SongsList[] | null;
};

const initialState: InitialState = {
  isPlaying: false,
  songId: null,
  songsList: null,
};

export const songSlice = createSlice({
  name: "songState",
  initialState,
  reducers: {
    setIsSongPlaying: (state, action: { payload: boolean }) => {
      state.isPlaying = !state.isPlaying;
      if (action.payload) {
        state.isPlaying = action.payload;
      }
    },
    setSongId: (state, action) => {
      if (action.payload) {
        state.songId = action.payload;
      }
    },
    setSongsList: (state, action) => {
      if (action.payload) {
        state.songsList = action.payload;
      }
    },
  },
});

export const getIsSongPlaying = (state: RootState) => state.songState.isPlaying;
export const getSongId = (state: RootState) => state.songState.songId;
export const getSongsList = (state: RootState) => state.songState.songsList;

export const { setIsSongPlaying, setSongId, setSongsList } = songSlice.actions;

export default songSlice.reducer;
