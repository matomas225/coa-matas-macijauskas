import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/state/store";

type Album = {
  _id: string;
  title: string;
  artist: string;
  coverImagePath?: string;
  songs: any[];
};

type InitialState = {
  albums: Album[] | null;
  currentAlbum: Album | null;
  isAlbumModalOpen: boolean;
  albumCreateModal: boolean;
};

const initialState: InitialState = {
  albums: null,
  currentAlbum: null,
  isAlbumModalOpen: false,
  albumCreateModal: false,
};

export const albumSlice = createSlice({
  name: "albumState",
  initialState,
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setCurrentAlbum: (state, action) => {
      state.currentAlbum =
        state.albums?.find((a) => a._id === action.payload) ?? null;
    },
    resetAlbums: () => initialState,
    setIsAlbumModalOpen: (state, action) => {
      state.isAlbumModalOpen = action.payload;
    },
    setAlbumCreateModal: (state, action) => {
      state.albumCreateModal = action.payload;
    },
  },
});

export const {
  setAlbums,
  setCurrentAlbum,
  resetAlbums,
  setIsAlbumModalOpen,
  setAlbumCreateModal,
} = albumSlice.actions;
export const getCurrentAlbum = (state: RootState) =>
  state.albumState.currentAlbum;
export const getAlbums = (state: RootState) => state.albumState.albums;
export const getAlbumCreateModal = (state: RootState) =>
  state.albumState.albumCreateModal;
export const getIsAlbumModalOpen = (state: RootState) =>
  state.albumState.isAlbumModalOpen;
export default albumSlice.reducer;
