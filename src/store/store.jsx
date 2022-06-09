import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "../pages/homepage/videoSlice";
import PlaylistReducer from "../pages/playlist/playlistSlice";
import AuthReducer from "../pages/auth/authSlice";
import ThemeReducer from "../pages/theme/themeSlice";
export const store = configureStore({
reducer: {
    theme: ThemeReducer,
    auth: AuthReducer,
    video: VideoReducer,
    playlist: PlaylistReducer,
},
});