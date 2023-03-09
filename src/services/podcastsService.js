import { API_URL, API_URL_PODCAST, PROXY_URL } from "../config";
import podcastMapper from "../mappers/podcastMapper";
const xml2js = require("xml2js");

const podcastsService = {
  getAll: () => {
    return fetch(API_URL)
      .then((response) => response.json())
      .then((data) => podcastMapper.mapPodcasts(data.feed.entry))
      .catch((error) => {
        console.error("Error fetching the list of podcasts", error);
      });
  },
  getPodcast: (podcastId) => {
    const URL = `${PROXY_URL}${API_URL_PODCAST}${podcastId}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const mappedPodcast = podcastMapper.mapPodcast(data["results"][0]);
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
        console.error("Error fetching podcast", error);
      });
  },

  getEpisodes: (url) => {
    return fetch(`${PROXY_URL}${url}`)
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
        }).catch((error) => {
          console.error("Error fetching episodes", error);
        });

        const podcastDescription = result.rss.channel["itunes:summary"]
          ? result.rss.channel["itunes:summary"]
          : result.rss.channel["description"];
        const episodes = podcastMapper.mapEpisodes(result.rss.channel.item);

        return { episodes, description: podcastDescription };
      });
  },
};

export default podcastsService;
