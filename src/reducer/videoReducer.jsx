export const VideoReducer = (state, {type,payload}) => {
    switch(type) {
        case "ADD_WATCH_LATER":
        return {
            ...state,
            watchLaterList: payload
        }
        case "ADD_LIKEDVIDEO":
            return{
                ...state,
                LikedVideos: payload
            }
        case "ADD_HISTORY":
            return{
                ...state,
                History: payload
            }
        case "ADD_PLAYLIST":
            return{
                ...state,
                Playlist: payload
            }
        case "ADD_VIDEO_TO_PLAYLIST":
            console.log(state)
            return {
                ...state, Playlist: state.Playlist.map((playlist) =>
                    playlist._id === payload.playlistId
                        ? { ...playlist, videos: [...playlist.videos, payload.video] } : playlist)
            }
        case "REMOVE_PLAYLIST":
                return{
                    ...state,
                    Playlist: payload
                }
        case "REMOVE_VIDEO_FROM_PLAYLIST":
            return {
                ...state, Playlist: state.Playlist.map((playlist) =>
                    playlist._id === payload.playlistId ? { ...playlist, videos: playlist.videos.filter((video) => video._id !== payload.videoId), } : playlist)
            }        
        default:
        return state;
    }
}