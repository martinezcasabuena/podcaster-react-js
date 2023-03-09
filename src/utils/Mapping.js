import GenerateGUID from "./GenerateGUID";

const Mapping = {
  mapPodcasts: (data) => {
    let podcasts = [];
    data.forEach((podcast) => {
      podcasts.push({
        id: podcast.id.attributes["im:id"],
        title: podcast["im:name"].label,
        image: podcast["im:image"][2].label,
        artist: podcast["im:artist"].label,
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
      var id = episode.guid["_"] ? episode.guid["_"] : episode.guid;
      const validID = /^[^\/:]*$/.test(id);
      if (!validID) {
        id = GenerateGUID();
      }

      episodes.push({
        id: id,
        title: episode.title,
        date: episode.pubDate,
        duration: episode["itunes:duration"],
        description: episode.description,
        audioURL: episode.enclosure?.url,
        audioType: episode.enclosure?.type,
      });
    });
    return episodes;
  },
};

export default Mapping;
