import API_URL from "../config";
import Mapping from "../utils/Mapping";
const xml2js = require("xml2js");

const podcastsService = {
  getAll: () => {
    return fetch(API_URL)
      .then((response) => response.json())
      .then((data) => Mapping.mapPodcasts(data.feed.entry));
  },
  getPodcast: (podcastId) => {
    const URL = `https://itunes.apple.com/lookup?id=${podcastId}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const mappedPodcast = Mapping.mapPodcast(data["results"][0]);
        return podcastsService
          .getEpisodes(mappedPodcast.feedUrl)
          .then(({ episodes, description }) => {
            const fullPodcast = {
              ...mappedPodcast,
              description,
              episodes: episodes,
            };

            return fullPodcast;
          });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  },

  getEpisodes: (url) => {
    return fetch(url)
      .then((response) => response.text())
      .then(async (xml) => {
        const result = await new Promise((resolve, reject) => {
          xml2js.parseString(
            xml,
            { explicitArray: false, mergeAttrs: true },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });

        const podcastDescription = result.rss.channel["itunes:summary"]
          ? result.rss.channel["itunes:summary"]
          : result.rss.channel["description"];
        const episodes = Mapping.mapEpisodes(result.rss.channel.item);

        return { episodes, description: podcastDescription };
      });
  },
};

export default podcastsService;
