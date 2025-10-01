import { RootState } from '@/state/store'
import { createSlice } from '@reduxjs/toolkit'

type SongsList = {
  artist: string
  id: string
  imagePath: string
  songPath: string
  title: string
}

type InitialState = {
  isPlaying: boolean
  songId: null | string
  songsList: SongsList[] | null
}

const initialState: InitialState = {
  isPlaying: false,
  songId: null,
  songsList: null,
}

export const songSlice = createSlice({
  name: 'songState',
  initialState,
  reducers: {
    setIsSongPlaying: (state, action: { payload?: boolean }) => {
      // Correctly respect explicit boolean payloads, including false
      if (typeof action.payload === 'boolean') {
        state.isPlaying = action.payload
      } else {
        state.isPlaying = !state.isPlaying
      }
    },
    setSongId: (state, action) => {
      if (action.payload) {
        state.songId = action.payload
      }
    },
    setSongsList: (state, action) => {
      if (typeof action.payload === 'function') {
        // Allow functional updates for convenience in UI code
        state.songsList = action.payload(state.songsList)
      } else if (action.payload) {
        state.songsList = action.payload
      }
    },
    resetSongState: () => initialState,
  },
})

export const getIsSongPlaying = (state: RootState) => state.songState.isPlaying
export const getSongId = (state: RootState) => state.songState.songId
export const getSongsList = (state: RootState) => state.songState.songsList

export const { setIsSongPlaying, setSongId, setSongsList, resetSongState } =
  songSlice.actions

export default songSlice.reducer
