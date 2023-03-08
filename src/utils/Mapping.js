const Mapping = {
  mapPodcasts: (data) => {
    let podcasts = [];
    data.forEach((podcast) => {
      podcasts.push({
        id: podcast.id.attributes["im:id"],
        title: podcast["im:name"].label,
        image: podcast["im:image"][2].label,
        artist: podcast["im:artist"].label,
        description: podcast.summary?.label,
      });
    });
    return podcasts;
  },
  mapPodcast: (data) => {
    let podcast = {
      id: data.trackId,
      title: data.collectionName,
      image: data.artworkUrl600,
      artist: data.artistName,
      feedUrl: data.feedUrl,
    };
    return podcast;
  },
  mapEpisodes: (data) => {
    let episodes = [];
    data.forEach((episode) => {
      episodes.push({
        id: episode.guid,
        title: episode.title,
        date: episode.pubDate,
        duration: episode["itunes:duration"],
        description: episode.description,
      });
    });
    return episodes;
  },
};

export default Mapping;
