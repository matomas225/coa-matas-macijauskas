import { RootState } from "@/state/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  songId: null,
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
  },
});

export const getIsSongPlaying = (state: RootState) => state.songState.isPlaying;
export const getSongId = (state: RootState) => state.songState.songId;

export const { setIsSongPlaying, setSongId } = songSlice.actions;

export default songSlice.reducer;
