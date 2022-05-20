export const filterFunction = (videosData, searchQuery, category) => {
    let videos = videosData;
    
    if (searchQuery) {
        videos = videos.filter(item =>
            item.title.toLowerCase().includes(searchQuery)
        );
    }
    if (category !== "All") {
        videos = videos.filter(item => item.category === category)
    }
    return videos;
}