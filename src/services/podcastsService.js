import API_URL from "../config";
import xmlToJson from "../utils/XMLToJson";
const xml2js = require("xml2js");

const parser = new DOMParser();

const podcastsService = {
  getAll: async () => {
    return fetch(API_URL).then((response) => response.json());
  },
  getPodcast: async (podcastId) => {
    const URL = `https://itunes.apple.com/lookup?id=${podcastId}`;
    return fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        const secondUrl = data.results[0].feedUrl;
        return fetch(secondUrl)
          .then((response) => response.text())
          .then(async (xml) => {
            const result = await new Promise((resolve, reject) => {
              xml2js.parseString(
                xml,
                { explicitArray: false, ignoreAttrs: true },
                (err, result) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              );
            });

            const completeData = {
              ...data["results"][0],
              podcastDetails: result.rss.channel,
            };

            return completeData;

            //const parser = new DOMParser();
            //const xmlDoc = parser.parseFromString(xml, "text/xml");
            //const xmlObj = xmlToJson(xmlDoc);

            // const completeData = {
            //   ...data["results"][0],
            //    podcastDetails: xmlObj.rss.channel,
            // };

            // return completeData;
          });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  },
};

export default podcastsService;
