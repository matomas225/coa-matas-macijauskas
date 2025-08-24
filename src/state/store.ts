import { sessionSlice } from "@/components/Login/sessionSlice";
import { manageSongsSlice } from "@/components/ManageSongsCard/manageSongsSlice";
import { popupCardSlice } from "@/components/PopupCard/popupCardSlice";
import { profilePopupSlice } from "@/components/ProfilePopup/profilePopupSlice";
import { songSlice } from "@/components/SongsList/songSlice";
import { songUploadSlice } from "@/components/SongUploadCard/songUploadSlice";
import { songUpdateSlice } from "@/components/SongUpdateCard/songUpdateSlice";
import { authSlice } from "@/pages/Auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { albumSlice } from "@/components/Albums/albumSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    session: sessionSlice.reducer,
    profilePopup: profilePopupSlice.reducer,
    songState: songSlice.reducer,
    popupCardState: popupCardSlice.reducer,
    songUpload: songUploadSlice.reducer,
    manageSongs: manageSongsSlice.reducer,
    songUpdate: songUpdateSlice.reducer,
    albumState: albumSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
