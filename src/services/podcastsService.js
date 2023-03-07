import API_URL from "../config";

const podcastsService = {
  getAll: async () => {
    return fetch(API_URL).then((response) => response.json());
  },
};

export default podcastsService;
