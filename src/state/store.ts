import { sessionSlice } from "@/components/Login/sessionSlice";
import { popupCardSlice } from "@/components/PopupCard/popupCardSlice";
import { profilePopupSlice } from "@/components/ProfilePopup/profilePopupSlice";
import { songSlice } from "@/components/SongsList/songSlice";
import { songUploadSlice } from "@/components/SongUploadCard/songUploadSlice";
import { authSlice } from "@/pages/Auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    session: sessionSlice.reducer,
    profilePopup: profilePopupSlice.reducer,
    songState: songSlice.reducer,
    popupCardState: popupCardSlice.reducer,
    songUpload: songUploadSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
