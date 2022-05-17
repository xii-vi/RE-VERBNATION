const isVideoInWatchLater = (videoId, watchLater) => {
    return watchLater.find(({
        _id
    }) => _id === videoId)
}
const isVideoInLikedVideo = (videoId, likedVideo) => {
    return likedVideo.find(({
        _id
    }) => _id === videoId)
}
const isVideoInHistory = (videoId, history) => {
    return history.find(({
        _id
    }) => _id === videoId)
}

export{
    isVideoInWatchLater,
    isVideoInLikedVideo,
    isVideoInHistory
}