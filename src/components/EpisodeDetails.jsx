import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import localStorageService from "../services/localStorageService";
import { AppContext } from "../App";

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const [episodeInfo, setEpisodeInfo] = useState({});
  const { loading } = useContext(AppContext);

  useEffect(() => {
    const value = localStorageService.getKey(`p-${podcastId}`);
    if (value) {
      const episodeItem = value.podcastDetails.item.find(
        (x) => x.guid == episodeId
      );
      if (episodeItem) {
        setEpisodeInfo(episodeItem);
      }
    }
  }, [loading]);

  return (
    <div>
      <h2>{episodeInfo.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: episodeInfo.description }}></p>
      <audio controls>
        <source src="" type="audio/mp3" />
      </audio>
    </div>
  );
};

export default EpisodeDetails;
